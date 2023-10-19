import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewAndRatingController } from './reviewAndRating.controller';
import { ReviewAndRatingValidation } from './reviewAndRating.validation';

const router = Router();

router.get('/', ReviewAndRatingController.getReviewAndRatings);
router.get('/:id', ReviewAndRatingController.getReviewAndRating);
router.get('/service/:id', ReviewAndRatingController.getReviewsByServieId);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ReviewAndRatingValidation.update),
  ReviewAndRatingController.updateReviewAndRating
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ReviewAndRatingController.deleteReviewAndRating
);

router.post(
  '/create-review',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ReviewAndRatingValidation.create),
  ReviewAndRatingController.insertIntoDB
);

export const ReviewAndRatingRoutes = router;
