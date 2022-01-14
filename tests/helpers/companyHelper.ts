import supertest from 'supertest';
import dotenv from 'dotenv';

// Import enviroment variables and parsing into the single process.env
dotenv.config({ path: './config.env' });
import app from '../../app';

const api = supertest(app);

const initialCompanies = [
	{
		businessName: 'GIAN LOPEZ',
		nit: 12323123,
		email: 'lopezarizagianlucas@gmail.com',
		address: 'Carrera 16 #5-32',
		phone: 3022236578,
		legalRepresentative: 'Anthony Acosta',
		docComCam: 'company-12323123-1639190690411.pdf',
		docRUT: 'company-12323123-1639190690448.pdf',
		docLegalRepresentativeID: 'company-12323123-1639190690770.pdf',
		radicado: '20217500355100128E',
		status: 'ACTIVO',
		createdAt: Date.now(),
		docSocialSecurity: [],
		finishDates: [],
		observations: [],
		password: 'U2FsdGVkX19Bmbcx5FBPq9Tpt7z0r53LufutGK+hMPk=',
		updatedAt: Date.now(),
	},
	{
		businessName: 'ANTHONY ACOSTA',
		nit: 1140904429,
		email: 'lopezarizagianlucas@gmail.io',
		address: 'Carrera 16 #5-32',
		phone: 3022236598,
		legalRepresentative: 'Anthony Acosta',
		docComCam: 'company-12323123-1639190690411.pdf',
		docRUT: 'company-12323123-1639190690448.pdf',
		docLegalRepresentativeID: 'company-12323123-1639190690770.pdf',
		radicado: '20217500355100129E',
		status: 'ACTIVO',
		createdAt: Date.now(),
		docSocialSecurity: [],
		finishDates: [],
		observations: [],
		password: 'U2FsdGVkX19Bmbcx5FBPq9Tpt7z0r53LufutGK+hMPk=',
		updatedAt: Date.now(),
	},
];

const getFilePath = (predicate: number) => {
	return `${__dirname}/../../store/documents/company/${predicate}/company-${predicate}-1637594392592.pdf`;
};

export { initialCompanies, getFilePath, api };
