import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(2, {message: 'Name is required.'}),
    email: z.string().email({message: 'Invalid email.'}),
    password: z.string().min(5, {message: 'Password must be at least 5 characters'}),
});
export type signupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    email: z.string().email({message: 'Invalid email.'}),
    password: z.string().min(5, {message: 'Password must be at least 5 characters'}),
});
export type loginSchema = z.infer<typeof loginSchema>;

