import { CronJob } from 'cron';
import { ModelsOrdinary, StatusOrdinary } from '../interfaces/ordinaries/ordinariesEnum';

export default (Model) =>
	new CronJob(
		'0 1 * * *',
		async function () {
			await Model.updateMany(
				{ qrCodeDate: { $lt: new Date(Date.now()) } },
				{ $set: { status: 'INACTIVO', qrCodeDate: null } }
			);
		},
		null
	);

// Rechaza luego de dos dias (lunes a viernes) sin respuesta.
export function autoDecline(ordinary: any): void {
	const { _id, ordinaryType } = ordinary;
	const model = ModelsOrdinary[ordinaryType];
	new CronJob('0 0 */2 * 1-5', async () => {
		const { status } = await model.findById(_id);
		if (status === StatusOrdinary.Pending) {
			await model.updateOne({ _id }, { $set: { status: 'RECHAZADO' } });
		}
	}).start();
}