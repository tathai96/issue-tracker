import {z} from "zod";

export const issuesSchema = z.object({
    title: z.string().nonempty('Title is required').max(255),
    description: z.string().nonempty('Description is required').max(255)
});


export const patchIssueSchema = z.object({
    title: z.string().nonempty('Title is required').max(255).optional(),
    description: z.string().nonempty('Description is required').max(255).optional(),
    assignedToUserId: z.string().nonempty('Assigned To UserId is required').max(255).optional().nullable(),
});