import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { orderFilterableFields } from './order.constants';
import { OrderService } from './order.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const data = req.body;

  const result = await OrderService.insertIntoDB(token, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created Successfully',
    data: result,
  });
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const options = pick(req.query, paginationFields);
  const token = req.headers.authorization as string;

  const result = await OrderService.getOrders(filters, options, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getOrderByCustomerAndAdminById = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    const { orderId } = req.params;

    const result = await OrderService.getOrderByCustomerAndAdminById(
      orderId,
      token
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order retrieved Successfully',
      data: result,
    });
  }
);

export const OrderController = {
  getOrderByCustomerAndAdminById,
  insertIntoDB,
  getOrders,
};
