import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';

const router = Router();
router.post(
  '/create-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AdminValidation.create),
  AdminController.insertIntoDB
);

export const AdminRoutes = router;
