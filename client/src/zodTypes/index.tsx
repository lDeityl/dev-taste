import { z, ZodType } from 'zod'

type Schema = ZodType<string, any>;

export const password: Schema = z.string().min(8, 'Минимум 8 символов').max(100, 'Максимум 100 символов')

export const login: Schema = z.string().min(4)

export const code: Schema = z.string().length(6)
