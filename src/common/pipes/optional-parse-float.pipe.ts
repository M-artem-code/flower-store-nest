import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class OptionalParseFloatPipe implements PipeTransform<
  string | undefined,
  number | undefined
> {
  transform(value: string | undefined): number | undefined {
    if (value === undefined) return undefined;

    const val = Number(value);
    if (Number.isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }

    return val;
  }
}
