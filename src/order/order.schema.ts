// import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { Document, Types } from 'mongoose';
// import { Product } from 'src/product/product.schema';
// import { User } from 'src/user/user.schema';
// @Schema()
// export class Order extends Document<Types.ObjectId> {
//   @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
//   @IsNotEmpty()
//   @IsString()
//   productId: Product;

//   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
//   @IsNotEmpty()
//   @IsString()
//   userId: User;

//   @Prop({ type: Number, required: true })
//   @IsNotEmpty()
//   @IsNumber()
//   quantity: number;

//   @Prop({ type: Number, required: true })
//   @IsNotEmpty()
//   @IsNumber()
//   totalPrice: number;
// }
// export const OrderSchema = SchemaFactory.createForClass(Order);
