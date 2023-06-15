import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDTO } from 'src/dto/create-tash.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';
import { Task } from 'src/schema/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll() {
    return await this.taskModel.find();
  }

  async create(createTask: CreateTaskDTO) {
    const newTask = new this.taskModel(createTask);
    return await newTask.save();
  }

  async findOne(id: string) {
    return await this.taskModel.findById(id);
  }

  async delete(id: string) {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async update(id: string, task: UpdateTaskDTO) {
    return await this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }
}
