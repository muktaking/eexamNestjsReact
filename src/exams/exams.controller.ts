import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ExamsService } from "./exams.service";
import { CreateExamDto } from "./dto/exam.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/roles.guard";
import { Role } from "src/roles.decorator";
import { RolePermitted } from "src/users/user.model";

@UseGuards(AuthGuard("jwt"), RolesGuard)
@Controller("exams")
export class ExamsController {
  constructor(private readonly examService: ExamsService) {}

  @Post()
  @Role(RolePermitted.mentor)
  @UsePipes(ValidationPipe)
  async createExam(@Body() createExamDto: CreateExamDto, @Req() req) {
    return await this.examService.createExam(createExamDto, req.user.id);
  }

  // @Post()
  // @UseGuards(AuthGuard("jwt"))
  // async findProfileByUserEmail {
  //   return await this.examService.findProfileByUserEmail();
  // }

  @Get("miniinfo")
  @Role(RolePermitted.student)
  async findUserExamInfo(@Req() req) {
    return await this.examService.findUserExamInfo(req.user.email);
  }

  @Get("total")
  @Role(RolePermitted.student)
  @UseGuards(AuthGuard("jwt"))
  async findExamTotalNumber() {
    return await this.examService.findExamTotalNumber();
  }

  @Get()
  @Role(RolePermitted.student)
  async findAllExams() {
    return await this.examService.findAllExams();
  }

  @Get("/latest")
  @Role(RolePermitted.student)
  async findLatestExam() {
    return await this.examService.findLatestExam();
  }

  @Get(":id")
  @Role(RolePermitted.student)
  async findExamById(@Param("id") id) {
    return await this.examService.findExamById(id);
  }

  @Get("questions/:id")
  @Role(RolePermitted.student)
  async findQuestionsByExamId(@Param("id") id) {
    return await this.examService.findQuestionsByExamId(id);
  }
}
