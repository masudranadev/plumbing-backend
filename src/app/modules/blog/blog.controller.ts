import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BlogService } from './blog.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const data = req.body;
  const result = await BlogService.insertIntoDB(data, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created Successfully!!!',
    data: result,
  });
});
const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getBlogs();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs retrieved Successfully!!!',
    data: result,
  });
});
const getBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getBlog(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog retrieved Successfully!!!',
    data: result,
  });
});
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.deleteBlog(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted Successfully!!!',
    data: result,
  });
});

export const BlogController = {
  insertIntoDB,
  getBlogs,
  getBlog,
  deleteBlog
};
