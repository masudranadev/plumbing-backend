import { Router } from 'express';
import { ProfileController } from './profile.controller';

const router = Router();

router.get('/:userId', ProfileController.myProfile);

export const ProfileRoutes = router;
