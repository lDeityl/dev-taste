import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z';

export const twoFactorCode = z.object({
    twoFactorAuthenticationCode: z.string().length(6),
});

export class twoFactorCodeDto extends createZodDto(twoFactorCode) { }