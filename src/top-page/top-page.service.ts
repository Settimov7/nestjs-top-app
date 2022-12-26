import { Injectable } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { TopLevelCategory, TopPageModel } from "./top-page.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { CreateTopPageDto } from "./dto/create-top-page.dto";

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel) private readonly  topTageModel: ModelType<TopPageModel>) {}

  async create(dto: CreateTopPageDto) {
    return this.topTageModel.create(dto as any);
  }

  async findById(id: string) {
    return this.topTageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.topTageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.topTageModel.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 }).exec();
  }

  async deleteById(id: string) {
    return this.topTageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto) {
    return this.topTageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
