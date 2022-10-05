import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  //ParseIntPipe,
} from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/filter')
  getByFilter(): string {
    return 'Ruta de en duro se ponen antes de rutas dinamicas';
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number): Product {
    return this.productsService.finOne(productId);
  }

  @Get('/')
  get(): // @Query('limit') limit = 100, @Query('offset') offset: number
  Product[] {
    // const { limit, offset } = params; // ES6 destructuring
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put('/:id')
  updateOne(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }
}
