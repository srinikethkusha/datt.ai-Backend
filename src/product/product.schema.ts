// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import {
//   IsNotEmpty,
//   IsString,
//   IsNumber,
//   MinLength,
//   IsIn,
// } from 'class-validator';
// import { Document, Types } from 'mongoose';

// @Schema()
// export class Product extends Document<Types.ObjectId> {
//   @Prop({ type: String, required: true })
//   @IsNotEmpty()
//   @IsString()
//   @MinLength(3)
//   productName: string;

//   @Prop({ type: Number, required: true })
//   @IsNotEmpty()
//   @IsNumber()
//   productPrice: number;

//   @Prop({ type: String, required: true })
//   @IsNotEmpty()
//   @IsString()
//   productDescription: string;

//   @Prop({ type: String, required: true })
//   @IsNotEmpty()
//   @IsString()
//   @IsIn(
//     [
//       'footwear',
//       'clothes',
//       'mobiles',
//       'watches',
//       'accessories',
//       'homeneeds',
//       'domesticneeds',
//     ],
//     { message: 'Invalid product type' },
//   )
//   productType: string;
// }

// export const ProductSchema = SchemaFactory.createForClass(Product);
