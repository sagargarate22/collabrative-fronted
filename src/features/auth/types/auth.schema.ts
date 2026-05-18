import {z} from 'zod';

export const loginSchema = z.object(
    {
        email: z.email("Email Address is required."),
        password: z.string().min(8, "Password must me at least 8 characters.")
    }
);

export type LoginFormData = z.infer<typeof loginSchema>;