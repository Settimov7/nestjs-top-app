import { IsString } from "class-validator";

export class AuthDTO {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
