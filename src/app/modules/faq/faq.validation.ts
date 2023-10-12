import { z } from "zod";

const create = z.object({
    body: z.object({
        question: z.string({required_error: "Question is Required!"}),
        answer: z.string({required_error: "Answer is Required!"})
    })
})

export const FaqValidation = {
    create
}