import z from "zod";

export const createWorkspaceSchema = z.object({
    name: z.string().min(1, "Workspace name is required.")
});

export const updateWokspaceSchema = z.object({
    name: z.string().min(1, "Workspace name is required.")
});


export type CreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>;

export type UpdateworkspaceFormData = z.infer<typeof updateWokspaceSchema>;

