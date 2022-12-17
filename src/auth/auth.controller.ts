import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthDTO } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {

  @Post('register')
  async register(@Body() dto: AuthDTO) {

  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDTO) {

  }
}
