// Import 3rd-party packages
import { Request } from 'express';
import HttpException from '../utils/httpException';

import multer from 'multer';
import fs from 'fs';

const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png'];

// ================================== MULTER CONFIGURATION TO HANDLE THE DOCUMENTS ===========================================
// Configuring first the type of the storage
const multerStorageOrdinary = multer.diskStorage({
	// Define the destination
	destination: (req: Request, file: Express.Multer.File, callback) => {
		let predicate;

		if (req.body.citizenship === undefined) {
			predicate = req['ordCitizenship'];
		} else {
			predicate = req.body.citizenship;
		}

		const directory = `store/documents/ordinaries/person/${predicate}`;

		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true });
		}

		callback(null, directory);
	},
	filename: (req: Request, file: Express.Multer.File, callback) => {
		let predicate;

		if (req.body.citizenship === undefined) {
			predicate = req['ordCitizenship'];
		} else {
			predicate = req.body.citizenship;
		}

		// Extracting the extension.
		const extension = file.mimetype.split('/')[1];
		callback(null, `ordinary-${predicate}-${Date.now()}.${extension}`);
	},
});

// Filtering for only PDF and images files
const multerFilterOrdinary = (
	req: Request,
	file: Express.Multer.File,
	callback: any
) => {
	const extension = file.mimetype.split('/')[1]
	if (ALLOWED_EXTENSIONS.includes(extension)) {
		callback(null, true);
	} else {
		callback(
			new HttpException('El formato del archivo es incorrecto.', 404),
			false
		);
	}
};

// ======================================= VEHICLE MULTER STARTS HERE ===========================================

// Configuring first the type of the storage
const multerStorageVehicle = multer.diskStorage({
	// Define the destination
	destination: (req: Request, file: Express.Multer.File, callback) => {
		let predicate;

		if (req.body.vehicleNumber === undefined) {
			predicate = req['ordVehicleNumber'];
		} else {
			predicate = req.body.vehicleNumber;
		}

		const directory = `store/documents/ordinaries/vehicle/${predicate}`;

		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true });
		}

		callback(null, directory);
	},
	filename: (req: Request, file: Express.Multer.File, callback) => {
		let predicate;

		if (req.body.vehicleNumber === undefined) {
			predicate = req['ordVehicleNumber'];
		} else {
			predicate = req.body.vehicleNumber;
		}

		// Extracting the extension.
		const extension = file.mimetype.split('/')[1];
		callback(null, `ordinary-${predicate}-${Date.now()}.${extension}`);
	},
});

// Filtering for only PDF files
const multerFilterVehicle = (
	req: Request,
	file: Express.Multer.File,
	callback: any
) => {
	const extension = file.mimetype.split('/')[1]
	if (ALLOWED_EXTENSIONS.includes(extension)) {
		callback(null, true);
	} else {
		callback(
			new HttpException('El formato del archivo es incorrecto.', 404),
			false
		);
	}
};

// ConfigMulter

const uploadOrdinaryPerson = multer({
	storage: multerStorageOrdinary,
	fileFilter: multerFilterOrdinary,
});

const uploadOrdinaryVehicle = multer({
	storage: multerStorageVehicle,
	fileFilter: multerFilterVehicle,
});

export { uploadOrdinaryPerson, uploadOrdinaryVehicle };
