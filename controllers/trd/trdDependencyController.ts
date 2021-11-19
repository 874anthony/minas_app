// Importing our models
import TRDDependency from '../../models/trd/trdDependency';

// Importing the factory
import { createOne, findAll, findOne } from '../handlerFactory';

const createDependency = createOne(TRDDependency);
const getAllDependencies = findAll(TRDDependency);
const getDependency = findOne(TRDDependency);

export { createDependency, getAllDependencies, getDependency };
