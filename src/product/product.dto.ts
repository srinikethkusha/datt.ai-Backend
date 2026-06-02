import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { ProductType } from '@prisma/client';
export class createProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  productPrice: number;

  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(ProductType)
  productType: ProductType;
}

export class updateProductDto {
  @IsNumber()
  @IsNotEmpty()
  productPrice: number;

  @IsString()
  @IsNotEmpty()
  productDescription: string;
}
