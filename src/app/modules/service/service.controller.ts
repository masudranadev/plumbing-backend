import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceFilterableFields } from './service.constants';
import { Services } from './service.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await Services.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created Successfully',
    data: result,
  });
});

const getServices = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await Services.getServices(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services Fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});


const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Services.getServiceById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully',
    data: result,
  });
});

const updateServiceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await Services.updateServiceById(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteServiceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Services.deleteServiceById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const ServiceController = {
  insertIntoDB,
  getServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
