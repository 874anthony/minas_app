// Importing our models
import TRDSerie from '../../models/trd/trdSerie';

// Importing the factory
import { createOne, findAll, findOne } from '../handlerFactory';

const createSerie = createOne(TRDSerie);
const getAllSeries = findAll(TRDSerie);
const getSerie = findOne(TRDSerie);

export { createSerie, getAllSeries, getSerie };
