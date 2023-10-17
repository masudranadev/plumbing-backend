import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AdminService } from './admin.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin created successfully',
    data: result,
  });
});

export const AdminController = {
  insertIntoDB,
};
