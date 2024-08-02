import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://madhur:Madhur123@cluster0.bcfhrzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UserModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
