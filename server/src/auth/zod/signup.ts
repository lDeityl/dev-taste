import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z';

export const password = z.password().min(8).atLeastOne('uppercase').atLeastOne('lowercase').atLeastOne('digit').max(100)

export const SignUpSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    password: password,
    confirmPassword: password
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match"
        });
    }
});


export const confirmationCode = z.object({
    code: z.string().length(6),
});

export class confirmationCodeDto extends createZodDto(confirmationCode) { }

export class SignUpDto extends createZodDto(SignUpSchema) { }