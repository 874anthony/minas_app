// Importing own models
import PermanentPerson from '../../../models/ordinaries/persons/permanentPersonModel';
import CronJob from '../../../utils/cronJob';
import { UserRoles } from '../../../models/users/userModel';

// Importing the factory
import * as ordinaryFactory from '../../ordinaryFactory';
import { NextFunction, Request } from 'express';
import { StatusOrdinary } from '../../../interfaces/ordinaries/ordinariesEnum';

const uploadPermanentPersons = ordinaryFactory.uploadPerson;

const getCitizenship = ordinaryFactory.getOrdinaryCitizenship(PermanentPerson);

const createPermanentPerson = async (req: any, res: any, next: NextFunction) => {
	let roles = [
		UserRoles.AccessControl,
		UserRoles.Auditing,
		UserRoles.RSE,
		UserRoles.SST,
		UserRoles.SMIN,
		UserRoles.SSFF
	];
	let checks: any = {
		checkAccessControl: false,
		checkAuditing: false,
		checkRSE: false,
		checkSST: false,
		checkSMIN: false,
		checkSSFF: false,
	};
	let corrects: any = {
		correctAccessControl: false,
		correctAuditing: false,
		correctRSE: false,
		correctSST: false,
		correctSMIN: false,
	}
	const { citizenship } = req.body;
	const ord = await PermanentPerson.findOne({ citizenship });
	if (ord?.status === StatusOrdinary.Forbidden) {
		roles = [UserRoles.SSFF];
		checks = { checkSSFF: false };
		corrects = {};
	}
	return ordinaryFactory.createOrdinary(
		PermanentPerson,
		roles,
		checks,
		corrects
	)(req, res, next);
}

const updatePermanentPerson = ordinaryFactory.updateOrdinary(PermanentPerson);

// Cron Job to verify if Date.now() > qrCodeDate
const job = CronJob(PermanentPerson);
job.start();

export {
	createPermanentPerson,
	uploadPermanentPersons,
	getCitizenship,
	updatePermanentPerson,
};
