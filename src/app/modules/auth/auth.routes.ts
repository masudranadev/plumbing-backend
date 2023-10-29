import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.create),
  AuthController.insertIntoDB
);

router.post(
  '/signin',
  validateRequest(AuthValidation.signin),
  AuthController.signin
);

router.post(
  '/forgot/password',
  validateRequest(AuthValidation.reset),
  AuthController.resetPassword
);

export const AuthRoutes = router;
