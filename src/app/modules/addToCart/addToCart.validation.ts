import { z } from "zod";

const create = z.object({
    body: z.object({
        userId: z.string({required_error: "User Id is Required!"}).optional(),
        serviceId: z.string({required_error: "Service Id is Required!"})
    })
})

export const AddToCartValidation = {
    create
}