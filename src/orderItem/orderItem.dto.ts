import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class createOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  productId: string;
}
export class updateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
