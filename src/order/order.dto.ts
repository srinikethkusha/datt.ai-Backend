// import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
// import mongoose from 'mongoose';
// import { convertToObjectId } from './ObjectIdConverter';

export class createOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsString()
  OrderItemId: string;
}
export class updateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
