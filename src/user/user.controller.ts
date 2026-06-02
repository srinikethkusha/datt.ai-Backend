import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from '@prisma/client';
import { AddUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query('query') query: string): Promise<User[]> {
    return await this.userService.getUsersByQuery(query);
  }
  @Get('/:id')
  async getUser(@Param('id') userId: string): Promise<string | User> {
    const result = await this.userService.getUser(userId);
    return result;
  }

  @Post()
  async addUser(@Body() userData: AddUserDto): Promise<string | User> {
    return await this.userService.addUser(userData);
  }

  @Put('/:id')
  async updateUser(
    @Body() userData: UpdateUserDto,
    @Param('id') userId: string,
  ): Promise<string | User> {
    const updatedUser = await this.userService.updateUser(userData, userId);
    return updatedUser;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<string> {
    return await this.userService.deleteUser(userId);
  }
}
