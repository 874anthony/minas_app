import supertest from 'supertest';
// Importing dependencies
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import enviroment variables and parsing into the single process.env
dotenv.config({ path: './config.env' });

import app from '../../app';

const api = supertest(app);

beforeAll(() => {
	const DB = process.env.DATABASE_URI!.replace(
		'<password>',
		process.env.MONGODB_PASSWORD!
	);

	// Connecting to the DB itself
	// TODO: Handle errors
	mongoose
		.connect(DB, { dbName: 'minas_gecelca' })
		.then(() => console.log('DB connected succesfully!'));
});

test('companies are returned as json', async () => {
	await api
		.get('/api/v1/companies')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});
