import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../schema/task.schema';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
