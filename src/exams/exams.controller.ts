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

@Controller("exams")
export class ExamsController {
  constructor(private readonly examService: ExamsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createExam(@Body() createExamDto: CreateExamDto, creator: string) {
    return await this.examService.createExam(createExamDto, creator);
  }

  // @Post()
  // @UseGuards(AuthGuard("jwt"))
  // async findProfileByUserEmail {
  //   return await this.examService.findProfileByUserEmail();
  // }

  @Get("miniinfo")
  @UseGuards(AuthGuard("jwt"))
  async findUserExamInfo(@Req() req) {
    return await this.examService.findUserExamInfo(req.user.email);
  }

  @Get("total")
  @UseGuards(AuthGuard("jwt"))
  async findExamTotalNumber() {
    return await this.examService.findExamTotalNumber();
  }

  @Get("/latest")
  async findLatestExam() {
    return await this.examService.findLatestExam();
  }

  @Get(":id")
  async findExamById(@Param("id") id) {
    return await this.examService.findExamById(id);
  }

  @Get("questions/:id")
  async findQuestionsByExamId(@Param("id") id) {
    return await this.examService.findQuestionsByExamId(id);
  }
}
