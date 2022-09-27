import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('/filter')
  getByFilter(): string {
    return 'Ruta de en duro se ponen antes de rutas dinamicas';
  }

  @Get('/:productId')
  /**
   * The function getOne() takes a parameter called productId, which is of type any. The function
   * returns a string
   * @param {any} productId - The name of the parameter in the URL.
   * @returns A string with the productId
   */
  getOne(@Param('productId') productId: any): string {
    return 'El producto buscado es:' + productId;
  }

  @Get('/')
  get(@Query('limit') limit = 100, @Query('offset') offset: number): string {
    // const { limit, offset } = params; // ES6 destructuring
    return `El limite es=> ${typeof limit} y el offset es: ${typeof offset}`;
  }

  @Post()
  create(@Body() payload: any) {
    return { message: 'El producto se creo correctamente', payload };
  }
}
