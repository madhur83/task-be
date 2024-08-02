import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const { username, password } = createUserDto;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({
      ...createUserDto,
      username,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserModel | null> {
    const user = await this.userModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const accessToken = this.jwtService.sign(payload);
    console.log(user.username, 'done');

    return {
      username: user.username,
      access_token: accessToken,
    };
  }

  async findAll(): Promise<UserModel[]> {
    return this.userModel.find().exec();
  }

  // async findOne(id: string): Promise<UserModel> {
  //   const user = await this.userModel.findById(id).exec();
  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }
  //   return user;
  // }

  // async updateUser(
  //   id: string,
  //   username: string,
  //   password: string,
  // ): Promise<UserModel> {
  //   try {
  //     // Find the user by ID
  //     const user = await this.userModel.findById(id).exec();
  //     if (!user) {
  //       throw new NotFoundException(`User with ID ${id} not found`);
  //     }
  //     user.username = username;
  //     user.password = await hashPassword(password);

  //     return this.userModel.save(user);
  //   } catch (error) {
  //     throw new Error(`Failed to update user: ${error.message}`);
  //   }
  // }

  // async deleteUser(id: string): Promise<void> {
  //   const result = await this.userModel.deleteOne({ _id: id }).exec();
  //   if (result.deletedCount === 0) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }
  // }
  // async validateUser(username: string, password: string): Promise<UserModel> {
  //   const user = await this.userModel.findOne({ username }).exec();
  //   if (user && (await comparePasswords(password, user.password))) {
  //     return user;
  //   }
  //   throw new UnauthorizedException('Invalid credentials');
  // }

  // async login(
  //   username: string,
  //   password: string,
  // ): Promise<{ accessToken: string }> {
  //   const user = await this.validateUser(username, password);
  //   const payload = { username: user.username, sub: user._id };
  //   const accessToken = this.jwtService.sign(payload);
  //   return { accessToken };
  // }
}
