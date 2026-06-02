// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { IsEmail, IsNotEmpty } from 'class-validator';
// import { Document, Types } from 'mongoose';

// @Schema()
// export class User extends Document<Types.ObjectId> {
//   @IsNotEmpty()
//   @Prop({ required: true })
//   name: string;

//   @IsNotEmpty()
//   @IsEmail()
//   @Prop({ required: true, unique: true })
//   email: string;

//   @Prop({ required: true })
//   age: number;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
