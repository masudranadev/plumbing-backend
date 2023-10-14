import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const myProfile = catchAsync(async (req: Request, res: Response) => {

  
  // const token = req.headers.authorization as string;
  const result = await ProfileService.myProfile(req.params.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Profile retrieved Successfully',
    data: result,
  });
});

export const ProfileController = {
    myProfile
}
