// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express';
import ExcelJS from 'exceljs';
import fs from 'fs';

// Importing our utils to this controller
import catchAsync from '../utils/catchAsync';
import HttpException from '../utils/httpException';
import APIFeatures from '../utils/apiFeatures';

// Utils here
import {
	getModelByType,
	ModelsOrdinary,
	PersonsOrdinary,
	StatusOrdinary,
	VehiclesOrdinary,
} from '../interfaces/ordinaries/ordinariesEnum';
import { TRDDependency } from '../models/trd/trdImportAll';
import {
	uploadOrdinaryPerson,
	uploadOrdinaryVehicle,
} from '../utils/multerConfig';
import Email from '../utils/email';

// Models here
import User from '../models/users/userModel';
import Workflow from '../models/workflows/workflowModel';
import Event from '../models/events/eventsModel';
import TRDOrdinary from '../models/trd/trdOrdinary';
import Company from '../models/companies/companyModel';
import contractorModel from '../models/contractors/contractorModel';

// ================================================ Endpoints starts here =========================================

// UPLOADS MIDDLEWARES
// const uploadAttached = uploadOrdinaryPerson.single()

const uploadPerson = uploadOrdinaryPerson.fields([
	{ name: 'docPicture', maxCount: 1 },
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
	{ name: 'docCompetenceCert', maxCount: 1 },
	{ name: 'docSISCONMP', maxCount: 1 },
	{ name: 'attached', maxCount: 20 },
]);

const uploadVehicle = uploadOrdinaryVehicle.fields([
	{ name: 'docPicture', maxCount: 1 },
	{ name: 'docSoat', maxCount: 1 },
	{ name: 'docPropertyCard', maxCount: 1 },
	{ name: 'docTechno', maxCount: 1 },
	{ name: 'docOperationCard', maxCount: 1 },
	{ name: 'docInspectionVehicle', maxCount: 1 },
	{ name: 'docMachineCard', maxCount: 1 },
	{ name: 'docBill', maxCount: 1 },
	{ name: 'docAduana', maxCount: 1 },
	{ name: 'attached', maxCount: 20 },
	// { name: 'docVehicleListCheck', maxCount: 1 },
]);

// AQUI TERMINA LOS UPLOADS MIDDLEWARES
const getOrdinaryCitizenship = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const currentOrdinary = await Model.findById(id);

		if (!currentOrdinary) {
			return next(
				new HttpException(
					'No hay ning??n ordinario con ese ID, intente nuevamente',
					404
				)
			);
		}

		req['ordCitizenship'] = currentOrdinary.citizenship;
		next();
	});

const getVehicleNumber = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;
		const currentOrdinary = await Model.findById(id);

		if (!currentOrdinary) {
			return next(
				new HttpException(
					'No hay ning??n ordinario con ese ID, intente nuevamente',
					404
				)
			);
		}

		req['ordVehicleNumber'] = currentOrdinary.vehicleNumber;
		next();
	});

const checkCompanyID = (req: Request, res: Response, next: NextFunction) => {
	const companyID = req.params.idCompany;
	req.query.companyID = companyID;
	next();
};

const checkContractorID = (req: Request, res: Response, next: NextFunction) => {
	const contractorID = req.params.idContractor;
	req.query.contractorID = contractorID;
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
		if (!req.params.idCompany && !req.params.idContractor) {
			return next(
				new HttpException(
					'No ha asociado ningun ID de la compa????a, intente nuevamente',
					404
				)
			);
		}

		if (!req.files) {
			return next(
				new HttpException(
					'No ha subido ning??n archivo, intente nuevamente',
					404
				)
			);
		}

		// Mutating the object req.body
		const body = { ...req.body };

		const arrayFilenames: Array<string> = [];

		// Looping through the req.files object to set it to the body
		Object.keys(req.files).forEach((el) => {
			if (el === 'attached') {
				Object.values(req.files![el]).forEach((el2: any, i) => {
					arrayFilenames.push(req.files![el][i].filename);
				});
			} else {
				body[el] = req.files![el][0].filename;
			}
		});

		body['attached'] = arrayFilenames;

		// CHECK IF THE DEPENDENCY (TRD) EXISTS
		const dependency = await TRDDependency.findById(body.dependency);

		if (!dependency) {
			return next(
				new HttpException('No se ha encontrado ning??na tipolog??a creada!', 404)
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
		// 18 D??gitos nueva versi??n: 4 a??o + 4 dependencia + 4 serie/subserie + 5 consecutivo + E
		const year: number = new Date().getFullYear();

		const dependencyCode = dependency.dependencyCode;

		let consecutive = trdOrdinary.getConsecutive() + 1;
		consecutive = ('000000' + consecutive).slice(-6);

		const radicado = `${year}${dependencyCode}${consecutive}9`;

		// INCREMENT THE CONSECUTIVE
		trdOrdinary.consecutive = trdOrdinary.getConsecutive() + 1;
		await trdOrdinary.save({ validateBeforeSave: false });

		body.radicado = radicado;

		if (req.params.idCompany) {
			body.companyID = req.params.idCompany;
		} else if (req.params.idContractor) {
			body.contractorID = req.params.idContractor;
		}

		const getOrdinary = async () => {
			const { citizenship } = body;
			if (citizenship) {
				const exists = await Model.exists({ citizenship });
				if (exists) {
					const query = await Model.findOne({ citizenship });
					if (query.ordinaryType === 'permanentPerson') {
						const { status } = query;
						if (status === StatusOrdinary.Forbidden) {
							return await Model.findOne({ citizenship });
						}
					}
				}
			}
			return await Model.create(body);
		};

		const ordinary = await getOrdinary();

		if (!ordinary) {
			return next(
				new HttpException(
					'No se ha podido crear el ordinario, intente nuevamente',
					404
				)
			);
		}

		const bodyEvent = {
			radicado: ordinary._id,
			action: 'Env??o de formulario',
			description: 'Se gener?? el nuevo tipo de ingreso',
		};

		await Event.create(bodyEvent);

		const usersPromises = Roles.map(async (role) => {
			const rolesQuery = new APIFeatures(User.find(), {
				role,
				status: 'true',
				fields: '_id,status,email',
			})
				.filter()
				.limitFields();

			return await rolesQuery.query;
		});

		const usersArray = await Promise.all(usersPromises);
		const usersID: any = [];
		const ordinaryOpts = {
			radicado,
			ordinaryType: getModelByType[ordinary.ordinaryType],
			id: ordinary.citizenship || ordinary.vehicleNumber,
		};

		usersArray.forEach((ArrayPerRole: Array<any>) => {
			ArrayPerRole.forEach(async (element) => {
				usersID.push(element._id);
				try {
					await new Email(element).sendOrdNotification(ordinaryOpts);
				} catch (error) {
					return next(
						new HttpException(
							'Hubo un error al enviar el correo, por favor intente m??s tarde',
							500
						)
					);
				}
			});
		});

		const bodyWorkflow: any = {
			radicado: ordinary._id,
			ordinaryType: ordinary.ordinaryType,
			roles: usersID,
			observations: req.body.observations,
			...checkRoles,
			...subsanarRoles,
		};

		try {
			const onflow = await Workflow.exists({ radicado: ordinary._id });
			if (!onflow) {
				bodyWorkflow.forbidden = ordinary.status === StatusOrdinary.Forbidden;
				await Workflow.create(bodyWorkflow);
			}
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
			message: 'Se ha creado el ordinario con ??xito',
			ordinary
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
			const arrayFilenames: Array<string> = [];
			// Looping through the req.files object to set it to the body
			Object.keys(req.files).forEach((el) => {
				if (el === 'attached') {
					Object.values(req.files![el]).forEach((el2: any, i) => {
						arrayFilenames.push(req.files![el][i].filename);
					});
				} else {
					body[el] = req.files![el][0].filename;
				}
			});
			body['attached'] = arrayFilenames;
		}

		body['updatedAt'] = Date.now();

		Object.keys(body).forEach((key) => {
			if (key === 'observations') {
				ordinaryUpdated[key].push(body[key]);
			} else {
				ordinaryUpdated[key] = body[key];
			}
		});

		if (req.body.isHealing) {
			ordinaryUpdated.status = StatusOrdinary.Pending;
			const workflowDoc = await Workflow.findOne({ radicado: id });

			Object.keys(workflowDoc._doc).forEach((el) => {
				if (el.startsWith('correct')) {
					workflowDoc[el] = false;
				}
			});

			workflowDoc['healingTimes'] += 1;

			await workflowDoc.save({ validateBeforeSave: false });
		}

		const bodyEvent = {
			radicado: id,
			action: 'Actualizaci??n de formulario',
			description: req.body.isHealing
				? 'Subida de documentos por corregir'
				: 'Se actualiz?? el registro',
		};

		await Event.create(bodyEvent);

		await ordinaryUpdated.save({ validateBeforeSave: false });

		res.status(200).json({
			status: true,
			message: 'Se ha actualizado el registro con ??xito',
			ordinaryUpdated,
		});
	});

const getAllOrds = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let params = req.query;
		if (params.companyID) {
			const { companyID } = params;
			const subcontractors = await contractorModel.find({ companyID });
			params = {
				$or: [
					{ companyID },
					{ contractorID: { $in: subcontractors } },
				]
			};
		}
		const ordinariesPromises = Object.values(ModelsOrdinary).map(
			async (Model) => {
				const feature = new APIFeatures(Model.find(), params)
					.filter()
					.sort()
					.limitFields()
					.paginate();
				return feature.query.populate([
					{ path: 'companyID', select: 'businessName' },
					{ path: 'contractorID', select: 'businessName' },
				]);
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
				new HttpException('No hay ning??n ID, por favor intente nuevamente', 404)
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

const inactiveOrdsByCompany = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { idCompany } = req.params;

		const promises = Object.values(ModelsOrdinary).map(async (Model) => {
			await Model.updateMany(
				{
					$and: [{ companyID: idCompany }, { status: 'ACTIVO' }],
				},
				{ status: 'INACTIVO', qrCodeDate: null }
			);
		});

		await Promise.all(promises);

		await Company.findByIdAndUpdate(
			idCompany,
			{ status: 'INACTIVO' },
			{ new: true, validateBeforeSave: false }
		);

		res.status(200).json({
			status: true,
			message: 'Se ha inactivado a todos los ordinarios con ??xito',
		});
	}
);

const activeOrdsByCompany = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { idCompany } = req.params;

		const promises = Object.values(ModelsOrdinary).map(async (Model) => {
			await Model.updateMany(
				{
					$and: [{ companyID: idCompany }, { status: 'INACTIVO' }],
				},
				{ status: 'ACTIVO' }
			);
		});

		await Promise.all(promises);

		await Company.findByIdAndUpdate(
			idCompany,
			{ status: 'ACTIVO' },
			{ new: true, validateBeforeSave: false }
		);

		res.status(200).json({
			status: true,
			message: 'Se ha activado a todos los ordinarios con ??xito',
		});
	}
);

const exportExcelPerson = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const workbook = new ExcelJS.Workbook(); // Creating a new workbook
		const sheet = workbook.addWorksheet('PERSONAL');

		const path = `${__dirname}/../../store/reports`;

		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true });
		}

		const extension = 'xlsx';
		const predicate = `ordinaries-person-${Date.now()}.${extension}`;

		sheet.columns = [
			{ header: 'Registro', key: 'radicado', width: 20 },
			{ header: 'ESTADO', key: 'status', width: 20 },
			{ header: 'Fecha inicio labores', key: 'startDates', width: 20 },
			{ header: 'Fecha fin labores', key: 'finishDates', width: 20 },
			{ header: 'Contratista ', key: 'nameCompany', width: 20 },
			{ header: 'Subcontratista ', key: 'nameContractor', width: 20 },
			{ header: 'Cedula', key: 'citizenship', width: 20 },
			{ header: 'Nombre', key: 'name', width: 20 },
			{ header: 'Cargo', key: 'appointment', width: 20 },
			{ header: 'Fecha recepci??n', key: 'recepcionDate', width: 20 },
			{
				header: 'Plazo m??ximo de autorizaci??n',
				key: 'maxAuthorizationDate',
				width: 20,
			},
			{ header: 'Fecha inducci??n', key: 'inductionDate', width: 20 },
			{ header: 'Vigencia induccion', key: 'inductionVigency', width: 20 },
			{ header: 'Tipo de ingreso', key: 'accessType', width: 20 },
			{ header: 'Sexo', key: 'gender', width: 20 },
			{ header: 'Lugar residencia', key: 'residentPlace', width: 20 },
			{ header: 'Lugar nacimiento', key: 'birthplace', width: 20 },
			// TODO: Fix docs
			// { header: 'Salud', key: 'docHealth', width: 20 },
			// { header: 'Pensi??n', key: 'docPension', width: 20 },
			// { header: 'ARL', key: 'docARL', width: 20 },
			{ header: 'Fecha concepto medico', key: 'medicalConceptDate', width: 20 },
			{ header: 'Categoria licencia', key: 'licenseCategory', width: 20 },
			{ header: 'Vigencia licencia', key: 'licenseVigency', width: 20 },
		];

		// Drawing the excel with the information
		const ordinariesPromises = Object.values(PersonsOrdinary).map(
			async (Model) => {
				return await Model.find().populate([
					{
						path: 'companyID',
						select: 'businessName',
					},
					{
						path: 'contractorID',
						select: 'businessName companyID',
						populate: {
							path: 'companyID',
							select: 'businessName',
						},
					},
				]);
			}
		);

		const ordinaries = await Promise.all(ordinariesPromises);

		ordinaries.flat().forEach((ordinary) => {
			let nameCompany;
			let nameContractor;

			if (Object.keys(ordinary['_doc']).includes('companyID')) {
				nameCompany = ordinary['_doc']['companyID'].businessName;
				nameContractor = 'No Aplica';
			} else if (Object.keys(ordinary['_doc']).includes('contractorID')) {
				nameContractor = ordinary['_doc']['contractorID'].businessName;
				nameCompany =
					ordinary['_doc']['contractorID'].companyID['businessName'];
			}

			const ordinaryExcel = {
				...ordinary['_doc'],
				nameCompany,
				nameContractor,
			};

			sheet.addRow(ordinaryExcel);
		});

		//Making the first line in excel bold
		sheet.getRow(1).eachCell((cell) => {
			cell.font = {
				name: 'Arial Black',
				color: { argb: '000000' },
				family: 2,
				size: 10,
				bold: true,
			};
			cell.fill = {
				type: 'gradient',
				gradient: 'angle',
				degree: 0,
				stops: [
					{ position: 0, color: { argb: 'FFE5CC' } },
					{ position: 0.9, color: { argb: 'FFFFFFFF' } },
					{ position: 1, color: { argb: 'FFE5CC' } },
				],
			};

			cell.alignment = { vertical: 'middle', horizontal: 'center' };
		});

		sheet.getRows(2, ordinaries.flat().length)?.forEach((cell) => {
			cell.font = { bold: true };
			cell.alignment = { vertical: 'middle', horizontal: 'center' };
		});

		try {
			await workbook.xlsx.writeFile(`${path}/${predicate}`);
		} catch (error) {
			return next(new HttpException('Something went wrong', 500));
		}

		res.download(`${path}/${predicate}`);
	}
);

const exportExcelVehicle = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const workbook = new ExcelJS.Workbook(); // Creating a new workbook
		const sheet = workbook.addWorksheet('VEHICULOS');

		const path = `${__dirname}/../../store/reports`;

		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true });
		}

		const extension = 'xlsx';
		const predicate = `ordinaries-vehicles-${Date.now()}.${extension}`;

		sheet.columns = [
			{ header: 'Registro', key: 'radicado', width: 20 },
			{ header: 'ESTADO', key: 'status', width: 20 },
			{ header: 'Fecha inicio labores', key: 'startDates', width: 20 },
			{ header: 'Fecha fin labores', key: 'finishDates', width: 20 },
			{ header: 'Contratista ', key: 'nameCompany', width: 20 },
			{ header: 'Subcontratista ', key: 'nameContractor', width: 20 },
			{ header: 'MAQ/VEHI', key: 'maqVehi', width: 20 },
			{ header: 'Tipo', key: 'type', width: 20 },
			{ header: 'Placa/n??mero de serie', key: 'vehicleNumber', width: 20 },
			{ header: 'Tipo de ingreso', key: 'accessType', width: 20 },
			{ header: 'Tipo de servicio', key: 'serviceType', width: 20 },
			{ header: 'Vigencia SOAT', key: 'soatVigency', width: 20 },
			{ header: 'Vigencia tecnomecanica', key: 'technoVigency', width: 20 },
			{
				header: 'Vigencia Tarjeta de Operacion',
				key: 'operationCardVigency',
				width: 20,
			},
		];

		// Drawing the excel with the information
		const ordinariesPromises = Object.values(VehiclesOrdinary).map(
			async (Model) => {
				return await Model.find().populate([
					{
						path: 'companyID',
						select: 'businessName',
					},
					{
						path: 'contractorID',
						select: 'businessName companyID',
						populate: {
							path: 'companyID',
							select: 'businessName',
						},
					},
				]);
			}
		);

		const ordinaries = await Promise.all(ordinariesPromises);

		ordinaries.flat().forEach((ordinary) => {
			let nameCompany;
			let nameContractor;
			let maqVehi;

			if (Object.keys(ordinary['_doc']).includes('companyID')) {
				nameCompany = ordinary['_doc']['companyID'].businessName;
				nameContractor = 'No Aplica';
			} else if (Object.keys(ordinary['_doc']).includes('contractorID')) {
				nameContractor = ordinary['_doc']['contractorID'].businessName;
				nameCompany =
					ordinary['_doc']['contractorID'].companyID['businessName'];
			}

			if (ordinary['_doc']['ordinaryType'] === 'permanentMachinery') {
				maqVehi = 'Maquinaria pesada';
			} else {
				maqVehi = ordinary['_doc']['vehicleType'];
			}

			const ordinaryExcel = {
				...ordinary['_doc'],
				nameCompany,
				nameContractor,
				maqVehi,
			};

			sheet.addRow(ordinaryExcel);
		});

		//Making the first line in excel bold
		sheet.getRow(1).eachCell((cell) => {
			cell.font = {
				name: 'Arial Black',
				color: { argb: '000000' },
				family: 2,
				size: 10,
				bold: true,
			};
			cell.fill = {
				type: 'gradient',
				gradient: 'angle',
				degree: 0,
				stops: [
					{ position: 0, color: { argb: 'FFE5CC' } },
					{ position: 0.9, color: { argb: 'FFFFFFFF' } },
					{ position: 1, color: { argb: 'FFE5CC' } },
				],
			};

			cell.alignment = { vertical: 'middle', horizontal: 'center' };
		});

		sheet.getRows(2, ordinaries.flat().length)?.forEach((cell) => {
			cell.font = { bold: true };
			cell.alignment = { vertical: 'middle', horizontal: 'center' };
		});

		try {
			await workbook.xlsx.writeFile(`${path}/${predicate}`);
		} catch (error) {
			return next(new HttpException('Something went wrong', 500));
		}

		res.download(`${path}/${predicate}`);
	}
);

export {
	getOrdinaryCitizenship,
	checkCompanyID,
	checkContractorID,
	getAllOrds,
	getOrdById,
	createOrdinary,
	updateOrdinary,
	inactiveOrdsByCompany,
	activeOrdsByCompany,
	uploadPerson,
	uploadVehicle,
	getVehicleNumber,
	exportExcelPerson,
	exportExcelVehicle,
};
