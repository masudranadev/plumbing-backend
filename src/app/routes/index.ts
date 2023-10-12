import express from 'express';
import { AddToCartRoutes } from '../modules/addToCart/addToCart.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BlogRoutes } from '../modules/blog/blog.route';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { FaqRoutes } from '../modules/faq/faq.routes';
import { FeedBackRoutes } from '../modules/feedBack/feedBack.route';
import { ProfileRoutes } from '../modules/profile/profile.routes';
import { ReviewAndRatingRoutes } from '../modules/reviewAndRating/reviewAndRating.routes';
import { ServiceRoutes } from '../modules/service/service.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/reviewAndRating',
    route: ReviewAndRatingRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/feedBacks',
    route: FeedBackRoutes,
  },
  {
    path: '/faqs',
    route: FaqRoutes,
  },
  {
    path: '/addToCarts',
    route: AddToCartRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
