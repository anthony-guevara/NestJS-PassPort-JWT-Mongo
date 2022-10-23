import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 2;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 1000,
      stock: 50,
      image: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 55.54,
      stock: 75,
      image: 'https://picsum.photos/200/300',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  finOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} does not exist`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId += 1;
    const newProduct: Product = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.finOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = { ...product, ...payload };

      return this.products[index];
    }
    return null;
  }
}
