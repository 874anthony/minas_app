// Importing the factory
import * as factory from '../handlerFactory';

// Importing own models
import User from '../../models/users/userModel';

const getUsers = factory.findAll(User);

export { getUsers };
