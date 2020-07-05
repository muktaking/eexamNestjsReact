import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Param
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";

import { User, RolePermitted } from "./user.model";
import { createUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly UserModel: Model<User>) {}

  async createUser(createUserDto: createUserDto) {
    let {
      firstName,
      lastName,
      userName,
      password,
      email,
      gender
    } = createUserDto;
    const user = new this.UserModel({
      firstName,
      lastName,
      userName,
      password,
      email,
      gender
    });
    //hashing password
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code == 11000) {
        throw new ConflictException(`Email: ['${email}'] is already exist.`);
      } else throw new InternalServerErrorException();
    }
  }

  async findAllUsers(): Promise<User[] | InternalServerErrorException> {
    return await this.UserModel.find({}, { password: 0, __v: 0 });
  }
  async findUserById(id: string): Promise<User | InternalServerErrorException> {
    return await this.UserModel.findById(id, { password: 0, __v: 0 });
  }

  async findOneUser(email: string): Promise<User | undefined> {
    return await this.UserModel.findOne({ email });
  }
}
