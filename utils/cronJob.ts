import { CronJob } from 'cron';

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
