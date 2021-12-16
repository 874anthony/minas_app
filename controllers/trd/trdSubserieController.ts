// Importing our models
import TRDSubSerie from '../../models/trd/trdSubSerie';

// Importing the factory
import { createOne, findAll, findOne, updateOne } from '../handlerFactory';

const createSubSerie = createOne(TRDSubSerie);
const getAllSubseries = findAll(TRDSubSerie);
const getSubserie = findOne(TRDSubSerie);
const updateSubserie = updateOne(TRDSubSerie);

export { createSubSerie, getAllSubseries, getSubserie, updateSubserie };
