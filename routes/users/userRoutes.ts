import express from 'express';

// Importing own controllers
import * as userController from '../../controllers/users/userController';

const router = express.Router();

router.route('/').get(userController.getUsers);

export default router;
