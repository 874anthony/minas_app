import PermanentPerson from '../../models/ordinaries/persons/permanentPersonModel';
import Workflow from '../../models/workflows/workflowModel';
import * as ordinaryHelper from '../helpers/ordinariesHelper';

import mongoose from 'mongoose';

import dotenv from 'dotenv';

// Import enviroment variables and parsing into the single process.env
dotenv.config({ path: './config.env' });

beforeAll(async () => {
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
	await PermanentPerson.deleteMany({});
	await Workflow.deleteMany({});
}, 10000);

describe('POST creating permanents', () => {
	xtest('When creating a permanent, generate a workflow', async () => {
		const firstCallWork = await Workflow.find();
		await ordinaryHelper.createPermanentPerson();

		const response = await Workflow.find();

		expect(response).toHaveLength(firstCallWork.length + 1);
	});
});

describe('PUT updating an ordinary', () => {
	xtest('When healing, all corrects are false', async () => {
		await ordinaryHelper.createPermanentPerson();

		const response = await ordinaryHelper.api.get('/api/v1/ordinaries');
		const id = response.body['ordinaries'][0][0]._id;

		const workRes = await Workflow.findOne({ radicado: id });
		workRes['correctAccessControl'] = true;
		await workRes.save();

		const bodyUpdate = {
			birthPlace: 'Argentina',
			isHealing: true,
		};

		await ordinaryHelper.api
			.put(`/api/v1/ordinaries-person/permanent-person/${id}`)
			.send(bodyUpdate);

		const workflowRes = await ordinaryHelper.api.get(`/api/v1/workflow/${id}`);

		const correctArray = ordinaryHelper.getArray(
			workflowRes.body['workflow'],
			'correct'
		);

		const allFalse = correctArray.every(
			(value) => workflowRes.body['workflow'][value] === false
		);

		expect(allFalse).toBeTruthy();
	});

	xtest('When all checks are true, delete from workflow', async () => {
		const resPerson = await ordinaryHelper.createPermanentPerson();
		const workflowDoc = await Workflow.findOne({
			radicado: resPerson.body['ordinary']._id,
		});

		const checkArray = ordinaryHelper.getArray(workflowDoc['_doc'], 'check');

		checkArray.forEach((checkField) => {
			workflowDoc[checkField] = true;
		});

		await workflowDoc.save();

		expect(await Workflow.find()).toHaveLength(0);
	});
});

describe('QR code tests', () => {
	xtest('Check if a QR code date is generated when ordinary status = ACTIVE', async () => {
		const res = await ordinaryHelper.createPermanentPerson();
		const id = res.body['ordinary']._id;

		const bodyUpdate = {
			status: 'ACTIVO',
		};

		await ordinaryHelper.api
			.put(`/api/v1/ordinaries-person/permanent-person/${id}`)
			.send(bodyUpdate);

		const currentOrdinary = await PermanentPerson.findById(id);

		expect(currentOrdinary['qrCodeDate']).not.toBeUndefined();
	});
});
