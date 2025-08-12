import { z } from "zod";


export const user_schema = z.object({

    username:
        z.string({
            required_error: "Username is required"
        }),



    email:
        z.string({
            required_error: "Email is required"
        })
            .email({
                message: "Invalid email"
            }),


    role:
        z.enum(['user', 'admin'], {
            required_error: 'Role is required',
            invalid_type_error: 'Role must be either "user" or "admin"',
        }),


    password:
        z.string({
            required_error: "Password is required"
        })
            .min(6, {
                message: "Password must be at least 6 characters"
            }),

});