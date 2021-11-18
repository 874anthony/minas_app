import { NextFunction, Request, Response } from 'express';

// Importing the global handler error and the catchAsync
import HttpException from '../../utils/httpException';
import catchAsync from '../../utils/catchAsync';

// Importing our models
import TRDTipoDoc from '../../models/trd/trdTipoDoc';

// Importing the Dto Objects
import DtoCreateTipoDoc from '../../interfaces/trd/tipodoc/post-createTipodoc';

const createTipoDoc = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const dependencyID = req.params.id;
		const serieID = req.params.idserie;
		const subSerieID = req.params.idsubserie;

		const body: DtoCreateTipoDoc = req.body;

		if (!body || !dependencyID || !serieID || !subSerieID) {
			return next(
				new HttpException(
					'Hacen faltan campos para la creación del tipo de documento',
					404
				)
			);
		}

		const newTipoDoc = await TRDTipoDoc.create({
			dependencyID,
			serieID,
			subSerieID,
			tipoDocCode: body.tipoDocCode,
			tipoDocName: body.tipoDocName,
		});

		if (!newTipoDoc) {
			return next(
				new HttpException(
					'No se pudo crear la serie, inténtelo nuevamente',
					400
				)
			);
		}

		return res.status(201).json({
			status: true,
			message: `Se creó exitosamente el tipo de documento - ${body.tipoDocName}`,
			serie: newTipoDoc,
		});
	}
);

export { createTipoDoc };
