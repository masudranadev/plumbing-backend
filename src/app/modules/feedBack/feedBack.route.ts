import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedBackController } from './feedBack.controller';
import { FeedBackValidation } from './feedBack.validation';

const router = Router();
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FeedBackController.getFeedBacks
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  FeedBackController.getFeedBack
);

router.post(
  '/create-feed-back',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(FeedBackValidation.create),
  FeedBackController.insertIntoDB
);

export const FeedBackRoutes = router;
