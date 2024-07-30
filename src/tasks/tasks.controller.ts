import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument, Task } from './schema/task.schema';

@Controller('tasks')
export class TaskController {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  // Create a new task
  @Post()
  async create(
    @Body() createTaskDto: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>,
  ) {
    const createdTask = new this.taskModel(createTaskDto);
    return await createdTask.save();
  }

  // Get all tasks
  @Get()
  async findAll() {
    return await this.taskModel.find().exec();
  }

  // Get a single task by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskModel.findById(id).exec();
  }

  // Update a task by ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateTaskDto: Partial<Omit<Task, '_id' | 'createdAt' | 'updatedAt'>>,
  ) {
    return await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  // Delete a task by ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.taskModel.findByIdAndDelete(id).exec();
  }
}
