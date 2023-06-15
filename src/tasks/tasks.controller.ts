import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from 'src/dto/create-tash.dto';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async findAll() {
    const response = await this.taskService.findAll();
    if (!response.length)
      throw new NotFoundException('No se encontraron tareas', {
        cause: new Error(),
        description: 'No se encontraron tareas o no hay tareas que mostrar',
      });
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.taskService.findOne(id);
    if (!response)
      throw new NotFoundException('No se encontro la tarea', {
        cause: new Error(),
        description: 'No se encontro la tarea',
      });
    return response;
  }

  @Post()
  async create(@Body() body: CreateTaskDTO) {
    try {
      return await this.taskService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Ya existe una tarea con ese nombre', {
          cause: new Error(),
        });
      }
      return error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const response = await this.taskService.delete(id);
    if (!response)
      throw new NotFoundException('No se encontro la tarea', {
        cause: new Error(),
        description: 'No se encontro la tarea',
      });
    return response;
  }

  @Put(':id')
  async update(@Body() body: UpdateTaskDTO, @Param('id') id: string) {
    try {
      return this.taskService.update(id, body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('No se pudo actualizar la tarea', {
          cause: new Error(),
        });
      }
      return error;
    }
  }
}
