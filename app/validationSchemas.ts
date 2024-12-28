import {z} from "zod";

export const issuesSchema = z.object({
    title: z.string().nonempty('Title is required').max(255),
    description: z.string().nonempty('Description is required').max(255)
})