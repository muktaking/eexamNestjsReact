import {
  Controller,
  Get,
  UsePipes,
  Body,
  Post,
  ValidationPipe,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { diskStorage } from "multer";
import { StemValidationPipe } from "./pipe/stem-validation.pipe";
import { CreateQuestionDto } from "./create-question.dto";
import { QuestionsService } from "./questions.service";
import { Stem } from "./question.model";
import { excelFileFilter, editFileName } from "../utils/file-uploading.utils";
import { FileInterceptor } from "@nestjs/platform-express";
import { IsNotEmpty } from "class-validator";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  async getAllQuestions() {
    return await this.questionService.findAllQuestions();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Body("stem", StemValidationPipe) stem: { stem: Stem; error: string }
  ) {
    return await this.questionService.createQuestion(createQuestionDto, stem);
  }

  @Post("/files")
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/files",
        filename: editFileName
      }),
      fileFilter: excelFileFilter
    })
  )
  async createQuestionByUpload(
    @Body("creator") creator: string,
    @Body("category") category: string,
    @UploadedFile() file: string
  ) {
    //console.log(creator, category, file);
    return await this.questionService.createQuestionByUpload(
      creator,
      category,
      file
    );
  }
}
