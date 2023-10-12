import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { FeedBackService } from './feedBack.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async(req: Request, res: Response) => {
    const result = await FeedBackService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Feed-Back created Successfully!",
        data: result
    })
})
const getFeedBacks = catchAsync(async(req: Request, res: Response) => {
    const result = await FeedBackService.getFeedBacks();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Feed-Backs retrived Successfully!",
        data: result
    })
})
const getFeedBack = catchAsync(async(req: Request, res: Response) => {
    const result = await FeedBackService.getFeedBack(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Feed-Back retrived Successfully!",
        data: result
    })
})

export const FeedBackController = {
    insertIntoDB,
    getFeedBacks,
    getFeedBack
}
