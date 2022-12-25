import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): any {
    if(metadata.type !== 'param') {
      return value;
    }

    if(!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Неверный формат id');
    }

    return value;
  }
}
