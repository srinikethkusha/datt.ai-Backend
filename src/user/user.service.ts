import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { User } from './user.schema';
import { UserRepository } from './user.repository';
import { AddUserDto, UpdateUserDto } from './user.dto';
// import { FilterQuery } from '@prisma/client';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsersByQuery(query: string): Promise<User[]> {
    return await this.userRepository.findAll(query);
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User with ID ${user_id} not found');
    }
    return user;
  }

  async addUser(newUser: AddUserDto): Promise<User | string> {
    const emailExists = await this.userRepository.findByEmail(newUser.email);
    if (emailExists) {
      throw new ConflictException('user with this email already exists');
    }
    const addedUser = await this.userRepository.create(newUser);
    return addedUser;
  }

  async updateUser(updatedUser: UpdateUserDto, userId: string): Promise<User> {
    const result = await this.userRepository.update(userId, updatedUser);
    if (!result) {
      throw new NotFoundException('User with ID ${user_id} not found');
    }
    return result;
  }

  async deleteUser(userId: string): Promise<string> {
    const result = await this.userRepository.delete(userId);
    if (!result) {
      throw new NotFoundException('User with id not found');
    }
    return 'User deleted successfully!';
  }
}
