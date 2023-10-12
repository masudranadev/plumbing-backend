import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookingFilterableFields } from './booking.constants';
import { BookingService } from './booking.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const data = req.body;

  const result = await BookingService.insertIntoDB(token, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Successfully',
    data: result,
  });
});

const getBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const options = pick(req.query, paginationFields);
  const token = req.headers.authorization as string;

  const result = await BookingService.getBookings(filters, options, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Data retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getBooking = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const { bookingId } = req.params;

  const result = await BookingService.getBooking(bookingId, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking data retrieved Successfully!',
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const { bookingId } = req.params;
  const data = req.body;

  const result = await BookingService.updateBooking(token, bookingId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking data updated Successfully!',
    data: result,
  });
});

export const BookingController = {
  insertIntoDB,
  getBookings,
  getBooking,
  updateBooking,
};
