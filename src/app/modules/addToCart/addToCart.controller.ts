import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AddToCartService } from "./addToCart.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const insertIntoDB = catchAsync(async(req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    const result = await AddToCartService.insertIntoDB(req.body, token);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service is Added",
        data: result
    })
});
const getAddToCarts = catchAsync(async(req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    const result = await AddToCartService.getAddToCarts(token);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Services retrived Successfully",
        data: result
    })
});
const getAddToCart = catchAsync(async(req: Request, res: Response) => {
    const result = await AddToCartService.getAddToCart(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service retrived Successfully",
        data: result
    })
});
const deleteAddToCart = catchAsync(async(req: Request, res: Response) => {
    const result = await AddToCartService.deleteAddToCart(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service deleted from AddToCart Successfully",
        data: result
    })
});



export const AddToCartController = {
    insertIntoDB,
    getAddToCarts,
    getAddToCart,
    deleteAddToCart
}