import {
  IsEnum,
  IsOptional,
  IsString,
  IsMongoId,
  IsDate,
} from 'class-validator';
import { TaskStatus } from '../schema/task.schema';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsMongoId()
  assignedTo?: string;

  @IsOptional()
  @IsMongoId()
  project?: string;

  @IsMongoId()
  createdBy: string;
}
