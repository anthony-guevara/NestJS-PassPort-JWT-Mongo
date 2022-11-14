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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

//custom pipe
import { MongoIdPipe } from './../../common/mongo-id.pipe';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/filter')
  getByFilter(): string {
    return 'Ruta de en duro se ponen antes de rutas dinamicas';
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string): any {
    return this.productsService.findOne(productId);
  }
  @ApiOperation({ summary: 'A list  of products' })
  @Get('/')
  get(): // @Query('limit') limit = 100, @Query('offset') offset: number
  any {
    // const { limit, offset } = params; // ES6 destructuring
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put('/:id')
  updateOne(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete('/:id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
