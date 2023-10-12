import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService} from './auth.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

const signin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfully',
    data: {
      token: result.accessToken,
    },
  });
});



export const AuthController = {
  insertIntoDB,
  signin,
};
