import { Injectable, NotFoundException } from '@nestjs/common';
import { createProductDto } from './product.dto';
// import { Product } from './product.schema';
import { ProductRepository } from './product.repository';
import { Product, ProductType } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async addProduct(newProduct: createProductDto): Promise<Product> {
    const addedProduct = await this.productRepository.create(newProduct);
    return addedProduct;
  }

  async getProducts(productType: ProductType): Promise<Product[]> {
    return await this.productRepository.findByType(productType);
  }

  async getByName(productName: string): Promise<Product[]> {
    return await this.productRepository.findByName(productName);
  }

  async updateProduct(
    productId: string,
    updateData: Partial<Product>,
  ): Promise<Product> {
    const result = await this.productRepository.updateProduct(
      productId,
      updateData,
    );
    if (!result) {
      throw new NotFoundException(`Product with name ${productId} not found`);
    }
    return result;
  }

  async deleteProduct(productId: string): Promise<string> {
    const result = await this.productRepository.delete(productId);
    if (!result) {
      throw new NotFoundException('product with id not found');
    }
    return 'product deleted successfully!';
  }
}
