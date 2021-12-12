import { initialCompanies, api, getFilePath } from '../helpers/companyHelper';
import Company from '../../models/companies/companyModel';

import { Response } from 'supertest';
// Importing dependencies
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import enviroment variables and parsing into the single process.env
dotenv.config({ path: './config.env' });

beforeAll(() => {
	const DB = process.env.DATABASE_URI!.replace(
		'<password>',
		process.env.MONGODB_PASSWORD!
	);

	// Connecting to the DB itself
	mongoose
		.connect(DB, { dbName: 'minas_gecelca_test' })
		.then(() => console.log('DB connected succesfully!'));
});

beforeEach(async () => {
	await Company.deleteMany({});

	const companyObjects = initialCompanies.map(
		(company) => new Company(company)
	);
	const companyPromises = companyObjects.map((company) => company.save());
	await Promise.all(companyPromises);
}, 10000);

describe('POST /api/v1/companies', () => {
	test('a valid company can be added', async () => {
		await api
			.post('/api/v1/companies')
			.attach('docComCam', getFilePath(1043604191))
			.attach('docRUT', getFilePath(1043604191))
			.attach('docLegalRepresentativeID', getFilePath(1043604191))
			.field('businessName', 'Anthony LOPEZ')
			.field('nit', 32658758)
			.field('email', 'lopezarizagianlucas@gmail.net')
			.field('address', 'Carrera 16 #5-32')
			.field('phone', 3004164299)
			.field('legalRepresentative', 'Anthony Acosta')
			.expect(201);

		const response = await api.get('/api/v1/companies');

		expect(response.body['data'].companies).toHaveLength(
			initialCompanies.length + 1
		);
	});

	test("Can't upload images", async () => {
		await api
			.post('/api/v1/companies')
			.attach('docComCam', getFilePath(1043604191))
			.attach('docRUT', getFilePath(1043604191))
			.attach(
				'docLegalRepresentativeID',
				`${__dirname}/../../store/documents/company/1043604191/company-1043604191-1637594392677.jpg`
			)
			.field('businessName', 'Anthony LOPEZ')
			.field('nit', 32658758)
			.field('email', 'lopezarizagianlucas@gmail.net')
			.field('address', 'Carrera 16 #5-32')
			.field('phone', 3004164299)
			.field('legalRepresentative', 'Anthony Acosta')
			.expect(404);
	});
});

describe('GET Companies', () => {
	test('there are companies', async () => {
		const response: Response = await api.get('/api/v1/companies');

		expect(response.body['data'].companies).toHaveLength(
			initialCompanies.length
		);
	});
});
