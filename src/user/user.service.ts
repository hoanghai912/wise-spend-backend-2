import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    const users = await this.userModel.find().select('-__v');
    return users;
  }

  async create(user: User): Promise<User> {
    const res = await this.userModel.create(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        // username: user.username,
        email: user.email,
        
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

  async login(email:string, password:string): Promise<{message:string, _id:string}> {
    const res = await this.userModel
      .findOne({ email: email })
      .select('-email -firstName -lastName -__v +_id +password');
    if (!res) {
      throw new HttpException('Email not found', 404);
    }
    else {
      const isMatch = await bcrypt.compare(password, res.password)
      if (!isMatch) {
        console.log("Wrong password")
        throw new HttpException('Wrong password', 401);
      }
      else {
        return {'message': 'successful', '_id': res._id.toString()}
      }
    }
  }

  async signup(email:string, password:string): Promise<{message:string}> {
    const res = await this.userModel
      .findOne({ email: email })
      .select('+email -firstName -lastName -__v -_id -password');
    if (res) {
      throw new HttpException('Email has been taken', HttpStatus.BAD_REQUEST);
    }
    else {
      const res = await this.userModel.create(
        {
          firstName: 'undefined',
          lastName: 'undefined',
          email: email,
          password: await bcrypt.hash(password,10)
        }
      )

      return {'message': 'successful'}
    }
  }
}
