import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// import { User, UserSchema } from './user.schema';
// import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
