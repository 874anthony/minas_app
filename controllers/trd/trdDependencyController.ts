import { NextFunction, Request, Response } from 'express';

// Importing the global handler error and the catchAsync
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';

// Importing our models
import TRDDependency from '../../models/trd/trdDependency';

// Importing the Dto Objects
import DtoCreateDependency from '../../interfaces/trd/dependency/post-createDependency';

const createDependency = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const body: DtoCreateDependency = req.body;

		if (!body) {
			return next(
				new HttpException(
					'Hacen faltan campos para la creación de la dependencia',
					404
				)
			);
		}

		const newDependency = await TRDDependency.create({
			dependencyCode: body.dependencyCode,
			dependencyName: body.dependencyName,
		});

		if (!newDependency) {
			return next(
				new HttpException(
					'No se pudo crear la dependencia, inténtelo nuevamente',
					400
				)
			);
		}

		return res.status(201).json({
			status: true,
			message: `Se creó exitosamente la dependencia - ${body.dependencyName}`,
			serie: newDependency,
		});
	}
);

export { createDependency };
