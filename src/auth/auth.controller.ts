import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthDTO } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { ALREADY_REGISTERED_ERROR } from "./auth.constants";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: AuthDTO) {
    const oldUser = await this.authService.findUser(dto.login);

    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return this.authService.createUser(dto);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async login(@Body() { login, password }: AuthDTO) {
    const { email } = await this.authService.validateUser(login, password);

    return this.authService.login(email);
  }
}
