import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

@Schema({ collection: 'tasks', timestamps: true })
export class Task {
  save() {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true })
  username: string;

  @Prop()
  title?: string;

  @Prop()
  description?: string;

  @Prop({ enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
export type TaskDocument = Task & Document;
