// Importing our models
import TRDSerie from '../../models/trd/trdSerie';

// Importing the factory
import { createOne, findAll, findOne, updateOne } from '../handlerFactory';

const createSerie = createOne(TRDSerie);
const getAllSeries = findAll(TRDSerie);
const getSerie = findOne(TRDSerie);
const updateSerie = updateOne(TRDSerie);

export { createSerie, getAllSeries, getSerie, updateSerie };
