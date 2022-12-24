import { Injectable } from '@nestjs/common';
import { AuthDTO } from "./dto/auth.dto";
import { UserModel } from "./user.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  async createUser(dto: AuthDTO) {
    const salt = genSaltSync(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: hashSync(dto.password, salt)
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
