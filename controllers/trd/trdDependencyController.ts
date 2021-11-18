// Importing our models
import TRDDependency from '../../models/trd/trdDependency';

// Importing the factory
import { createOneTRD } from '../trdFactory';

const createDependency = createOneTRD(TRDDependency);

export { createDependency };
