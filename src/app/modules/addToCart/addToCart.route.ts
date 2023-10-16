import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AddToCartController } from './addToCart.controller';
import { AddToCartValidation } from './addToCart.validation';

const router = Router();
router.get(
  '/',
  auth(ENUM_USER_ROLE.USER),
  AddToCartController.getAddToCarts
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  AddToCartController.getAddToCart
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  AddToCartController.deleteAddToCart
);

router.post(
  '/add-to-cart',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(AddToCartValidation.create),
  AddToCartController.insertIntoDB
);

export const AddToCartRoutes = router;
