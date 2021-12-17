import express from 'express';

// Importing own controllers
import * as userController from '../../controllers/users/userController';

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUser).put(userController.updateUser);

export default router;
