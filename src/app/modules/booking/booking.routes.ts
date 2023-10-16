import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingController.getBookings
);

router.get(
  '/:bookingId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingController.getBooking
);
router.patch(
  '/:bookingId',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.updateBooking
);
router.delete(
  '/:bookingId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  BookingController.deleteBooking
);

router.post(
  '/create-booking',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(BookingValidation.create),
  BookingController.insertIntoDB
);

export const BookingRoutes = router;
