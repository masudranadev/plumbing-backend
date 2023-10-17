import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';

const router = Router();

router.get('/', BlogController.getBlogs);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  BlogController.getBlog
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  BlogController.deleteBlog
);

router.post(
  '/create-blog',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(BlogValidation.create),
  BlogController.insertIntoDB
);

export const BlogRoutes = router;
