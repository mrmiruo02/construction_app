import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodType, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType<unknown>) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const formattedErrors = this.formatErrors(result.error);
      throw new BadRequestException({
        message: 'Validation failed',

        errors: formattedErrors,
      });
    }

    return result.data;
  }

  private formatErrors(error: ZodError) {
    return error.issues.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
  }
}
