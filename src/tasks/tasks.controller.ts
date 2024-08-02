import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task, TaskStatus } from './schema/task.schema';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body('username') username: string,
    @Body('title') title: string,
    @Body('description') description?: string,
  ): Promise<Task> {
    return await this.taskService.create(username, title, description);
  }

  @Get('/getPostsByUsername')
  async getPostsByUsername(
    @Query('username') username: string,
  ): Promise<Task[]> {
    return await this.taskService.findPostsByUsername(username);
  }

  @Get('/getTasksByStatusAndUsername')
  async getTasksByStatusAndUsername(
    @Query('username') username: string,
    @Query('status') status: string,
    @Query('taskIds') taskIds?: string,
  ) {
    if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
      throw new BadRequestException('Invalid status');
    }

    const taskIdsArray = taskIds
      ? taskIds.split(',').map((id) => parseInt(id, 10))
      : [];

    return await this.taskService.findTasksByStatusAndUsername(
      status as TaskStatus,
      username,
      taskIdsArray,
    );
  }

  // @Get('/getTaskByid')
  // async getTaskByUsernameAndTaskId(
  //   @Query('username') username: string,
  //   @Query('id') taskIds?: string,
  // ) {
  //   return await this.taskService.findTaskByUsernameAndTaskId(
  //     username,
  //     taskIds,
  //   );
  // }

  @Patch('/:id/update-status')
  async updateStatus(@Param('id') id: string): Promise<Task> {
    return this.taskService.updateStatusToPending(id);
  }
}
