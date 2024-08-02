import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../schema/task.schema';

export class CreateTaskDto {
  @IsString()
  username: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
