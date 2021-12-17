// Importing the factory
import * as factory from '../handlerFactory';

// Importing own models
import User from '../../models/users/userModel';

const getAllUsers = factory.findAll(User);
const getUser = factory.findOne(User);
const updateUser = factory.updateOne(User);

export { getAllUsers, getUser, updateUser };
