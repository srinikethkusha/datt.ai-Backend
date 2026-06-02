import { Injectable } from '@nestjs/common';
import { createProductDto } from './product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product, ProductType } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: createProductDto): Promise<Product> {
    return await this.prisma.product.create({
      data: product,
    });
  }

  async findByType(productType: ProductType): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: { productType },
    });
  }

  async findByName(productNames: string): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: { productName: productNames },
    });
  }

  async updateProduct(
    id: string,
    updateData: Partial<Omit<Product, 'id'>>,
  ): Promise<Product | null> {
    return await this.prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<string> {
    await this.prisma.product.delete({
      where: { id },
    });
    return `Product with ID ${id} deleted`;
  }
}
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Injectable } from '@nestjs/common';
// import { createProductDto } from './product.dto';
// import { Product } from './product.schema';

// @Injectable()
// export class ProductRepository {
//   constructor(
//     @InjectModel(Product.name) private productModel: Model<Product>,
//   ) {}

//   async create(product: createProductDto): Promise<Product> {
//     const newProduct = await this.productModel.create(product);
//     return newProduct;
//   }

//   async findByType(productType: string): Promise<Product[]> {
//     return await this.productModel.find({ productType });
//   }

//   async findByName(productName: string): Promise<Product[]> {
//     return await this.productModel.find({ productName });
//   }

//   async updateProduct(
//     _id: string,
//     updateData: Partial<Omit<Product, '_id'>>,
//   ): Promise<Product | null> {
//     return await this.productModel.findByIdAndUpdate({ _id }, updateData, {
//       new: true,
//     });
//   }

//   async delete(id: string): Promise<string> {
//     await this.productModel.findByIdAndDelete(id);
//     return `User with ID ${id} deleted`;
//   }
// }
