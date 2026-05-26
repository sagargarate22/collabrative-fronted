import {z} from 'zod';

export const loginSchema = z.object(
    {
        email: z.email("Email Address is required."),
        password: z.string().min(1, "Password is required.")
    }
);

export const RegisterSchema = z.object(
    {
        displayName: z.string().min(1, "Display Name is required."),
        email: z.email("Email Address is required."),
        password: z.string().min(8, "Password must me at least 8 characters."),
        confirmPassword: z.string().min(8, "Password must me at least 8 characters.")
    }
).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
})

export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterFormData = z.infer<typeof RegisterSchema>;