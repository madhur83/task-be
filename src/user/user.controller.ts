import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('yahaaa ya2', createUserDto);

    return this.userService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.userService.login(req.user);
  }
}
//   @Post('login')
//   async login(@Request() body: { username: string; userId: string }) {
//     const user = { username: body.username, userId: body.userId };
//     return this.userService.login(user);
//   }
// }

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
