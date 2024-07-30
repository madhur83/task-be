import { Document } from 'mongoose';
import { TaskStatus } from '../schema/task.schema';

export interface Task extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date;
  assignedTo?: string;
  project?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
