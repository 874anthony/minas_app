import { NextFunction, Request, Response } from 'express';

// Importing the global handler error and the catchAsync
import HttpException from '../utils/httpException';
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';

const createOne = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const body = req.body;

		if (!body) {
			return next(
				new HttpException(
					'Hacen faltan campos para la creación del documento',
					404
				)
			);
		}

		const document = await Model.create(body);

		if (!document) {
			return next(
				new HttpException(
					'No se pudo crear el documento, inténtelo nuevamente',
					400
				)
			);
		}

		return res.status(201).json({
			status: true,
			message: `Se creó el documento exitosamente!`,
			document,
		});
	});

const findAll = (Model) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const features = new APIFeatures(Model.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const documents = await features.query;

		if (documents.length === 0) {
			return next(
				new HttpException(
					'No hay documentos con ese criterio de búsqueda!',
					204
				)
			);
		}

		return res.status(200).json({
			status: true,
			documents,
		});
	});

/**
 * Obtener empresa por el ID;
 * @param id
 */
const findOne = (Model, populateOptions?) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id;

		let query = Model.findById(id);

		if (populateOptions) query = query.populate(populateOptions);

		const document = await query;

		if (!document) {
			return next(new HttpException('No hay un documento con este ID', 404));
		}

		return res.status(200).json({
			status: true,
			document,
		});
	});

export { createOne, findAll, findOne };
