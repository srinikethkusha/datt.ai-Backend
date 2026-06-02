import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto, updateProductDto } from './product.dto';
// import { Product } from './product.schema';
import { Product, ProductType } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(@Body() createProduct: createProductDto): Promise<Product> {
    return await this.productService.addProduct(createProduct);
  }

  @Get('/:productType')
  async getProducts(
    @Param('productType') productType: ProductType,
  ): Promise<Product[]> {
    return await this.productService.getProducts(productType);
  }

  @Get('get/:productName')
  async searchProducts(
    @Param('productName') productName: string,
  ): Promise<Product[]> {
    return await this.productService.getByName(productName);
  }

  @Put('/:id')
  async updateProduct(
    @Body() productData: updateProductDto,
    @Param('id') productId: string,
  ): Promise<Product> {
    const updatedproduct = await this.productService.updateProduct(
      productId,
      productData,
    );
    return updatedproduct;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') productId: string): Promise<string> {
    return await this.productService.deleteProduct(productId);
  }
}
