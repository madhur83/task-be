import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto'; // Adjust the path as needed

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
