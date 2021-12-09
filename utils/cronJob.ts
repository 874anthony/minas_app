import { CronJob } from 'cron';

export default (Model) =>
	new CronJob(
		'0 1 * * *',
		async function () {
			await Model.updateMany(
				{ qrCodeDate: { $lte: new Date(Date.now()) } },
				{ $set: { status: 'INACTIVO', qrCodeDate: null } }
			);
		},
		null
	);
