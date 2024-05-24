import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z';
import { password } from 'auth/zod/signup';

export const EmailSchema = z.object({
    email: z.string().email(),
})

export const VerifyRecoverSchema = z.object({
    email: z.string().email(),
    code: z.string().length(6)
})

export const ChangePasswordSchema = z.object({
    token: z.string(),
    password: password
})

export class ChangePasswordDto extends createZodDto(ChangePasswordSchema) { }
export class VerifyRecoverDto extends createZodDto(VerifyRecoverSchema) { }
export class EmailDto extends createZodDto(EmailSchema) { }
