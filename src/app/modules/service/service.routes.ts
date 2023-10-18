import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = Router();
router.get('/', ServiceController.getServices);
router.get('/:id', ServiceController.getServiceById);
router.get('/category/:categoryId', ServiceController.getServiceByCategoryId);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceValidation.update),
  ServiceController.updateServiceById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteServiceById
);

router.post(
  '/create-service',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceValidation.create),
  ServiceController.insertIntoDB
);

export const ServiceRoutes = router;
