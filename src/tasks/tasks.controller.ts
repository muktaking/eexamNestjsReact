import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards
} from "@nestjs/common";
import { TasksModule } from "./tasks.module";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task.model";
import { createTaskDto } from "./dto/create-task-dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { AuthGuard } from "@nestjs/passport";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  async getTasks() {
    return await this.tasksService.getAllTasks();
  }
  // getTasksByFilters(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskByFilters(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  @Get("/:id")
  async getTaskById(@Param("id") id: string) {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Patch("/:id/:status")
  async updateTaskById(
    @Param("id") id: string,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return await this.tasksService.updateTaskById(id, status);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id") id: string): Task[] {
    return this.tasksService.deleteTaskById(id);
  }
}
