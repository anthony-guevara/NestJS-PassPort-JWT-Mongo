import {
  IsString,
  IsNumber,
  IsUrl,
  IsEmail,
  IsDate,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  isPositive,
  Min,
  ValidateIf,
  ValidateNested,
  isNotEmpty,
  IsMongoId,
  IsArray,
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

import { CreateCategoryDto } from './category.dtos';
import { Type } from 'class-transformer';

import { CreateSubDocDto } from './sub-doc.dto';
export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  readonly category: CreateCategoryDto;

  @IsMongoId()
  @IsNotEmpty()
  readonly brand: string;

  @IsNotEmpty()
  @ValidateNested()
  readonly subDoc: CreateSubDocDto; // 👈 1:1

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDocDto)
  readonly subDocs: CreateSubDocDto[]; // 👈 1:N
}

export class UpdateProductDto extends PartialType(CreateProductDto) {} //Las mismas validaciones pero con campos opcionales

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @ValidateIf((params) => params.maxPrice)
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
