// Importing our models
import TRDTipoDoc from '../../models/trd/trdTipoDoc';

// Importing the factory
import { createOne, findAll, findOne, updateOne } from '../handlerFactory';

const createTipoDoc = createOne(TRDTipoDoc);
const getAllTipoDocs = findAll(TRDTipoDoc);
const getTipoDoc = findOne(TRDTipoDoc);
const updateTipoDoc = updateOne(TRDTipoDoc);

export { createTipoDoc, getAllTipoDocs, getTipoDoc, updateTipoDoc };
