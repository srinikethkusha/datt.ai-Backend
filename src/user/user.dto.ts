import { IsEmail, IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class AddUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  @Min(5)
  age: number;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  @Min(5)
  age: number;
}
export interface UserSearchCriteria {
  name?: string;
  email?: string;
  age?: number;
  // Add other search criteria as needed
}
