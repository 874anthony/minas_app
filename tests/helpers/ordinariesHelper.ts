import supertest from 'supertest';
import dotenv from 'dotenv';
import { addDate } from '../../utils/date';

// Import enviroment variables and parsing into the single process.env
dotenv.config({ path: './config.env' });

import app from '../../app';

const api = supertest(app);

const initialPermanentPersons: Array<any> = [
	{
		name: 'Anthony Acosta M.',
		appointment: 'Soldador',
		citizenship: 1140904429,
		gender: 'Hombre',
		birthplace: 'Colombia',
		licenseCategory: 'B1',
		radicado: '202175000001079',
		observations: [],
		companyID: '61b2394d9dc22aba728b4ed3',
		startDates: [],
		finishDates: [],
		status: 'PENDIENTE',
		attached: [],
		recepcionDate: Date.now(),
		ordinaryType: 'permanentPerson',
		maxAuthorizationDate: addDate(Date.now(), 3),
	},
];

const getFilePath = (predicate: number) => {
	return `${__dirname}/../../store/documents/company/${predicate}/company-${predicate}-1637594392592.pdf`;
};

const createPermanentPerson = async () => {
	return await api
		.post('/api/v1/ordinaries-person/permanent-person')
		.field('citizenship', 1140904429)
		.attach('docHealth', getFilePath(1043604191))
		.attach('docSocialSecurity', getFilePath(1043604191))
		.attach('docPension', getFilePath(1043604191))
		.attach('docCitizenship', getFilePath(1043604191))
		.attach('docMedicalFitness', getFilePath(1043604191))
		.attach('docARL', getFilePath(1043604191))
		.field('name', 'Anthony LOPEZ M.')
		.field('licenseCategory', 'B2')
		.field('appointment', 'Soldador')
		.field('gender', 'Hombre')
		.field('birthplace', 'Peru')
		.field('address', 'Carrera 16 #5-32')
		.field('dependency', '61b5489160dbd497c64c2062');
};

const getArray = (Document: any, field: string): Array<string> => {
	const fieldsArray: any = [];

	Object.keys(Document).forEach((el) => {
		if (el.startsWith(field)) {
			fieldsArray.push(el);
		}
	});

	return fieldsArray;
};

export {
	// initialPermanentPersons,
	// getFilePath,
	api,
	createPermanentPerson,
	getArray,
};
