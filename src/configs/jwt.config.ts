import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export async function getJwtConfig(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get('JWT_SECRET'),
  }
}
