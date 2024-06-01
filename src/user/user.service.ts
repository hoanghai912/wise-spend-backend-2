import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async create(user: User): Promise<User> {
    const res = await this.userModel.create(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        
        password: await bcrypt.hash(user.password,10)
      }
    )
    // try {
    //   await res.save()
    // } catch (error) {
    //   if(error.message.includes('username')){
    //     throw new HttpException('username has been taken',404)
    //   }
    //   if(error.message.includes('email')){
    //     throw new HttpException('email has been taken',404)
    //   }
    // }
    ;
    return res;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('user not found.');
    }

    return user;
  }

  async updateById(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
