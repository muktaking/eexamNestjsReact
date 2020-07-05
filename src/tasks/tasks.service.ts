import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import * as uuid from "uuid/v1";
import { createTaskDto } from "./dto/create-task-dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class TasksService {
  constructor(@InjectModel("Task") private readonly TaskModel: Model<Task>) {}

  private tasks: Task[] = [];

  async getTask(id: string): Promise<Task> {
    let task;
    try {
      task = await this.TaskModel.findById(id);
    } catch (error) {
      throw new NotFoundException(
        `Your task by this ${id} is not founded, error: ${error}`
      );
    }
    return task;
  }

  async getAllTasks() {
    const tasks = await this.TaskModel.find().exec();
    return tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status
    }));
  }
  async getTaskById(id: string) {
    let task = await this.getTask(id);
    return {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status
    };
  }
  // getTaskByFilters(filterDlo: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDlo;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(tasks => tasks.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task => task.title.includes(search) || task.description.includes(search)
  //     );
  //   }
  //   return tasks;
  // }
  async createTask(createTaskDto: createTaskDto) {
    const { title, description } = createTaskDto;
    const task = new this.TaskModel({
      title,
      description,
      status: TaskStatus.OPEN
    });
    const result = await task.save();
    return result as Task;
  }
  async updateTaskById(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTask(id);
    task.status = status;
    return await task.save();
  }
  deleteTaskById(id: string): Task[] {
    return (this.tasks = this.tasks.filter(task => task.id !== id));
  }
}
