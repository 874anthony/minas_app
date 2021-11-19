// Import 3rd-party packages
import express from 'express';

// Importing the controllers
import * as authController from '../../controllers/auth/authController';

const router = express.Router();

router.route('/create-user').post(authController.createUserRole);

export default router;
