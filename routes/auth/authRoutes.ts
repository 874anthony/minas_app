// Import 3rd-party packages
import express from 'express';

// Importing the controllers
import * as authController from '../../controllers/auth/authController';

const router = express.Router();

router.route('/is-allowed/:id').get(authController.isAllowedOrdinary);
router.route('/create-user').post(authController.createUserRole);
router.route('/login').post(authController.loginUsers);

export default router;
