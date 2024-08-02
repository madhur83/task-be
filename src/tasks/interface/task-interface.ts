import { Document } from 'mongoose';
import { TaskStatus } from '../schema/task.schema';

export interface Task extends Document {
  username: string;
  title: string;
  description?: string;
  status: TaskStatus;
}
