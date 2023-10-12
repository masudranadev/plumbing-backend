import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = Router();
router.get('/', BookController.getBooks);
router.get('/:categoryId/category', BookController.getBooksByCategoryId);
router.get('/:id', BookController.getBookById);
router.patch('/:id',auth(ENUM_USER_ROLE.ADMIN), BookController.updateBookById);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBookById);
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.create),
  BookController.insertIntoDB
);

export const BookRoutes = router;
