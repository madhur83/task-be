import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskStatus } from './schema/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  // async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
  //   const createdTask = new this.taskModel({
  //     ...createTaskDto,
  //     user: userId,
  //   });
  //   return await createdTask.save();
  // }

  async create(
    username: string,
    title: string,
    description?: string,
  ): Promise<Task> {
    const newTask = new this.taskModel({
      username,
      title,
      description,
      status: TaskStatus.PENDING,
    });
    console.log(newTask, 'newTask');
    const data = await newTask.save();
    console.log(data, 'data hai bhai');
    return data;
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async updateTaskStatus(taskId: string): Promise<Task> {
    const task = await this.taskModel.findById(taskId).exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.status !== TaskStatus.PENDING) {
      throw new BadRequestException(
        'Task status can only be updated from PENDING to COMPLETED',
      );
    }
    task.status = TaskStatus.COMPLETED;
    await task.save();

    return task;
  }

  async findPostsByUsername(username: string): Promise<Task[]> {
    return await this.taskModel.find({ username }).exec();
  }

  async findTasksByStatusAndUsername(
    status: TaskStatus,
    username: string,
    taskIds: number[] = [],
  ): Promise<Task[]> {
    const query: any = { status, username };
    if (taskIds.length > 0) {
      query._id = { $in: username };
    }
    return this.taskModel.find(query).exec();
  }

  // async findPostsByUsernameAndId(
  //   username: string,
  //   taskId?: number,
  // ): Promise<any[]> {
  //   const query: any = { username };

  //   if (taskId !== undefined) {
  //     query.taskId = taskId;
  //   }

  //   return await this.taskModel.find(query).exec();
  // }

  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateStatusToPending(id: string): Promise<Task> {
    const task = await this.findById(id);
    if (task.status === TaskStatus.PENDING) {
      task.status = TaskStatus.COMPLETED;
      await task.save();
    }
    return task;
  }
}
