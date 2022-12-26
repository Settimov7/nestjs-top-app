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
  UsePipes, ValidationPipe
} from "@nestjs/common";
import { FindProductDTO } from "./dto/find-product.dto";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { PRODUCT_NOT_FOUND_ERROR_MESSAGE } from "./product.constants";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = await  this.productService.findById(id);

    if(!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR_MESSAGE)
    }

    return product;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedProduct = await  this.productService.deleteById(id);

    if(!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR_MESSAGE)
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateProductDto) {
    const updatedProduct = await  this.productService.updateById(id, dto);

    if(!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR_MESSAGE)
    }

    return updatedProduct;
  }

  @Post('find')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async find(@Body() dto: FindProductDTO) {
    return this.productService.findWithReviews(dto);
  }
}
