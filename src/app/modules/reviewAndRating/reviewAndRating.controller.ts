import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { reviewAndRatingFilterableFields } from './reviewAndRating.constants';
import { ReviewAndRatingService } from './reviewAndRating.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewAndRatingService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added Successfully!',
    data: result,
  });
});

const getReviewAndRatings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewAndRatingFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await ReviewAndRatingService.getReviewAndRatings(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});
const getReviewAndRating = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewAndRatingService.deleteReviewAndRating(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully!',
    data: result,
  });
});
const updateReviewAndRating = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await ReviewAndRatingService.updateReviewAndRating(id, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review updated successfully!',
      data: result,
    });
  }
);
const deleteReviewAndRating = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ReviewAndRatingService.deleteReviewAndRating(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category deleted successfully',
      data: result,
    });
  }
);

export const ReviewAndRatingController = {
  insertIntoDB,
  getReviewAndRating,
  getReviewAndRatings,
  updateReviewAndRating,
  deleteReviewAndRating,
};
