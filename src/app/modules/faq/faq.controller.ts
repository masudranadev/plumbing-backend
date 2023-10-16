import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { FaqService } from "./faq.service";

const insertIntoDB = catchAsync(async(req: Request,res: Response) => {
    const result = await FaqService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "faq created successfully!",
        data: result
    })
})
const getFaqs = catchAsync(async(req: Request,res: Response) => {
    const result = await FaqService.getFaqs();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "faqs retrived successfully!",
        data: result
    })
})
const getFaq = catchAsync(async(req: Request,res: Response) => {
    const result = await FaqService.getFaq(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "faq retrived successfully!",
        data: result
    })
})
const updateFaq = catchAsync(async(req: Request,res: Response) => {
    const {id} = req.params;
    const data = req.body;
    const result = await FaqService.updateFaq(id, data);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "faq updated successfully!",
        data: result
    })
})
const deleteFaq = catchAsync(async(req: Request,res: Response) => {
    const result = await FaqService.deleteFaq(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "faq deleted successfully!",
        data: result
    })
})

export const FaqController = {
    getFaq,
    getFaqs,
    deleteFaq,
    updateFaq,
    insertIntoDB,
}