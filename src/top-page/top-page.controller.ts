import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { FindTopPageDto } from "./dto/find-top-page.dto";
import { CreateTopPageDto } from "./dto/create-top-page.dto";
import { TopPageService } from "./top-page.service";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { TOP_PAGE_NOT_FOUND_ERROR_MESSAGE } from "./top-page.constants";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findById(id);

    if(!page) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR_MESSAGE)
    }

    return page;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.topPageService.findByAlias(alias);

    if(!page) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR_MESSAGE)
    }

    return page;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedPage = await this.topPageService.deleteById(id);

    if(!deletedPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR_MESSAGE)
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
    const updatedPage = await this.topPageService.updateById(id, dto);

    if(!updatedPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR_MESSAGE)
    }

    return updatedPage;
  }

  @Post('find')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async find(@Body() { firstCategory }: FindTopPageDto) {
    return this.topPageService.findByCategory(firstCategory);
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }
}
