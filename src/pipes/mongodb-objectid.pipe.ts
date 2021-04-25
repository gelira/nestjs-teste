import {
  PipeTransform,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, string> {
  transform(value: any) {
    const validObjectId = Types.ObjectId.isValid(value);

    if (!validObjectId) {
      throw new NotAcceptableException('Invalid ObjectId');
    }

    return value as string;
  }
}
