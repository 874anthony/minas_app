// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';

// Importing our utils to this controller
import catchAsync from '../utils/catchAsync';
import HttpException from '../utils/httpException';
import APIFeatures from '../utils/apiFeatures';

// Utils here
import { ModelsOrdinary } from '../interfaces/ordinaries/ordinariesEnum';
import { TRDDependency } from '../models/trd/trdImportAll';
import {
	uploadOrdinaryPerson,
	uploadOrdinaryVehicle,
} from '../utils/multerConfig';

// Models here
import User from '../models/users/userModel';
import Workflow from '../models/workflows/workflowModel';
import TRDOrdinary from '../models/trd/trdOrdinary';

// ================================================ Endpoints starts here =========================================

// UPLOADS MIDDLEWARES
// const uploadAttached = uploadOrdinaryPerson.single()

const uploadPerson = uploadOrdinaryPerson.fields([
	{ name: 'docHealth', maxCount: 1 },
	{ name: 'docPension', maxCount: 1 },
	{ name: 'docARL', maxCount: 1 },
	{ name: 'docSocialSecurity', maxCount: 1 },
	{ name: 'docMedicalFitness', maxCount: 1 },
	{ name: 'docCitizenship', maxCount: 1 },
	{ name: 'docCV', maxCount: 1 },
	{ name: 'docDrivingLicense', maxCount: 1 },
	{ name: 'docPsycho', maxCount: 1 },
	{ name: 'docDefDrivingLicense', maxCount: 1 },
	{ name: 'docDrivingTest', maxCount: 1 },
	{ name: 'docCraneOperator', maxCount: 1 },
	{ name: 'docSafeworkHeights', maxCount: 1 },
	{ name: 'docRigger', maxCount: 1 },
]);

const uploadVehicle = uploadOrdinaryVehicle.fields([
	{ name: 'docSoat', maxCount: 1 },
	{ name: 'docPropertyCard', maxCount: 1 },
	{ name: 'docTechno', maxCount: 1 },
	{ name: 'docInspectionVehicle', maxCount: 1 },
	{ name: 'docMachineCard', maxCount: 1 },
	{ name: 'docBill', maxCount: 1 },
	{ name: 'docAduana', maxCount: 1 },
	{ name: 'docOperationCard', maxCount: 1 },
	{ name: 'docSISCONMP', maxCount: 1 },
	{ name: 'docVehicleListCheck', maxCount: 1 },
	{ name: 'docTeamCert', maxCount: 1 },
	{ name: 'docQualityCert', maxCount: 1 },
]);

// AQUI TERMINA LOS UPLOADS MIDDLEWARES
const getOrdinaryCitizenship = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const currentOrdinary = await Model.findById(id);

		if (!currentOrdinary) {
			return next(
				new HttpException(
					'No hay ningún ordinario con ese ID, intente nuevamente',
					404
				)
			);
		}

		req['ordCitizenship'] = currentOrdinary.citizenship;
		next();
	});

const checkCompanyID = (req: Request, res: Response, next: NextFunction) => {
	const companyID = req.params.idCompany;
	req.query.companyID = companyID;
	next();
};

// AQUI TERMINA LOS MIDDLEWARES
const createOrdinary = (
	Model,
	Roles: Array<string>,
	checkRoles: Object,
	subsanarRoles?: Object
) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		if (!req.files) {
			return next(
				new HttpException(
					'No ha subido ningún archivo, intente nuevamente',
					404
				)
			);
		}

		// Mutating the object req.body
		const body = { ...req.body };

		// Looping through the req.files object to set it to the body
		Object.keys(req.files).forEach(
			(el) => (body[el] = req.files![el][0].filename)
		);

		// CHECK IF THE DEPENDENCY (TRD) EXISTS
		const dependency = await TRDDependency.findById(body.dependency);

		if (!dependency) {
			return next(
				new HttpException('No se ha encontrado ningúna tipología creada!', 404)
			);
		}

		// NOW CHECK IF THERE HAS BEEN CONSECUTIVES BEFORE WITH THAT TRD, IF NOT CREATE ONE SEQUENCE.
		let trdOrdinary = await TRDOrdinary.findOne({
			dependency: body.dependency,
		});

		if (!trdOrdinary) {
			trdOrdinary = await TRDOrdinary.create({
				dependency: body.dependency,
			});
		}

		// GENERATING THE RADICADO NUMBER
		// 18 Dígitos nueva versión: 4 año + 4 dependencia + 4 serie/subserie + 5 consecutivo + E
		const year: number = new Date().getFullYear();

		const dependencyCode = dependency.dependencyCode;

		let consecutive = trdOrdinary.getConsecutive() + 1;
		consecutive = ('000000' + consecutive).slice(-6);

		const radicado = `${year}${dependencyCode}${consecutive}9`;

		// INCREMENT THE CONSECUTIVE
		trdOrdinary.consecutive = trdOrdinary.getConsecutive() + 1;
		await trdOrdinary.save({ validateBeforeSave: false });

		body.radicado = radicado;

		if (req.params.idCompany) body.companyID = req.params.idCompany;

		const newOrdinaryPerson = await Model.create(body);

		if (!newOrdinaryPerson) {
			return next(
				new HttpException(
					'No se ha podido crear el ordinario, intente nuevamente',
					404
				)
			);
		}

		const usersPromises = Roles.map(async (role) => {
			const rolesQuery = new APIFeatures(User.find(), {
				role,
				status: 'true',
				fields: '_id,status',
			})
				.filter()
				.limitFields();

			return await rolesQuery.query;
		});

		const usersID: any = [];

		const usersArray = await Promise.all(usersPromises);

		usersArray.forEach((ArrayPerRole: Array<any>) => {
			ArrayPerRole.forEach((element) => {
				usersID.push(element._id);
			});
		});

		const bodyWorkflow = {
			radicado: newOrdinaryPerson._id,
			ordinaryType: newOrdinaryPerson.ordinaryType,
			roles: usersID,
			observations: req.body.observations,
			...checkRoles,
			...subsanarRoles,
		};

		try {
			await Workflow.create(bodyWorkflow);
		} catch (error) {
			return next(
				new HttpException(
					'No se ha asignado correctamente el workflow, por favor vuelva a intentar',
					500
				)
			);
		}

		res.status(200).json({
			status: true,
			message: 'Se ha creado el ordinario con éxito',
			ordinary: newOrdinaryPerson,
		});
	});

const updateOrdinary = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		const ordinaryUpdated = await Model.findById(id);

		if (!ordinaryUpdated) {
			return next(
				new HttpException(
					'No hay un ordinario con ese ID, intente nuevamente!',
					404
				)
			);
		}

		// Mutating the object req.body
		const body = { ...req.body };

		if (req.files) {
			// Looping through the req.files object to set it to the body
			Object.keys(req.files).forEach(
				(el) => (body[el] = req.files![el][0].filename)
			);
		}

		body['updatedAt'] = Date.now();

		Object.keys(body).forEach((key) => {
			if (
				key === 'observations' ||
				key === 'startDates' ||
				key === 'finishDates' ||
				key === 'attached'
			) {
				ordinaryUpdated[key].push(body[key]);
			} else {
				ordinaryUpdated[key] = body[key];
			}
		});

		await ordinaryUpdated.save({ validateBeforeSave: false });

		if (req.body.isHealing) {
			const workflowDoc = await Workflow.findOne({ radicado: id });

			Object.keys(workflowDoc._doc).forEach((el) => {
				if (el.startsWith('correct')) {
					workflowDoc[el] = false;
				}
			});

			await workflowDoc.save({ validateBeforeSave: false });
		}

		res.status(200).json({
			status: true,
			message: 'Se ha actualizado el registro con éxito',
			ordinaryUpdated,
		});
	});

const getAllOrds = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const ordinariesPromises = Object.values(ModelsOrdinary).map(
			async (Model) => {
				let featuresQuery = new APIFeatures(Model.find(), req.query)
					.filter()
					.limitFields()
					.paginate()
					.sort();

				return await featuresQuery.query;
			}
		);

		const ordinaries = await Promise.all(ordinariesPromises);

		res.status(200).json({
			status: true,
			ordinaries,
		});
	}
);

const getOrdById = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const { ordinaryType } = req.body;

		if (!id)
			return next(
				new HttpException('No hay ningún ID, por favor intente nuevamente', 404)
			);

		const ordinary = await ModelsOrdinary[ordinaryType].findById(id);

		if (!ordinary) {
			return next(
				new HttpException(
					'No se ha podido encontrar un ordinario, intente nuevamente',
					404
				)
			);
		}

		res.status(200).json({
			status: true,
			ordinary,
		});
	}
);

export {
	getOrdinaryCitizenship,
	checkCompanyID,
	getAllOrds,
	getOrdById,
	createOrdinary,
	updateOrdinary,
	uploadPerson,
	uploadVehicle,
};
