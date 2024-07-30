import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/Login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.validateUser(username, password);
    if (user) {
      // If user is found and password is correct, return user or a token
      return { message: 'Login successful', user };
    } else {
      // If validation fails
      return { message: 'Invalid credentials' };
    }
  }

  // @Get('')
  // async findAll(): Promise<UserModel[]> {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<UserModel> {
  //   return this.userService.findOne(id);
  // }

  // @Put(':id')
  // async updateUser(
  //   @Param('id') id: string,
  //   @Body('username') username: string,
  //   @Body('password') password: string,
  // ): Promise<UserModel> {
  //   return this.userService.updateUser(id, username, password);
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: string): Promise<void> {
  //   return this.userService.deleteUser(id);
  // }
}
