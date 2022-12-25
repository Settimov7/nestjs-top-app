import { IsNumber, IsString } from "class-validator";

export class FindProductDTO {
  @IsString()
  category: string;

  @IsNumber()
  limit: number;
}
