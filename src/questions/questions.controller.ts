import {
  Controller,
  Get,
  UsePipes,
  Body,
  Post,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Param,
} from "@nestjs/common";
import { diskStorage } from "multer";
import { StemValidationPipe } from "./pipe/stem-validation.pipe";
import { CreateQuestionDto } from "./create-question.dto";
import { QuestionsService } from "./questions.service";
import { Stem } from "./question.model";
import { excelFileFilter, editFileName } from "../utils/file-uploading.utils";
import { FileInterceptor } from "@nestjs/platform-express";
import { IsNotEmpty } from "class-validator";
import { AuthGuard } from "@nestjs/passport";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  async getAllQuestions() {
    return await this.questionService.findAllQuestions();
  }

  @Get("/category/:id")
  async getQuestionsByCategory(@Param() categoryId) {
    return await this.questionService.findQuestionByFilter(
      "category",
      categoryId.id
    );
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Body("stem", StemValidationPipe) stem: { stem: Stem; error: string },
    @Req() req
  ) {
    return await this.questionService.createQuestion(
      createQuestionDto,
      stem,
      req.user.id
    );
  }

  @Post("/files")
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/files",
        filename: editFileName,
      }),
      fileFilter: excelFileFilter,
    })
  )
  async createQuestionByUpload(
    @Req() req,
    @Body("category") category: string,
    @UploadedFile() file: string
  ) {
    console.log(file);
    return await this.questionService.createQuestionByUpload(
      req.user.id,
      category,
      file
    );
  }
}
