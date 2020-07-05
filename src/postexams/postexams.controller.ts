import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { PostexamsService } from "./postexams.service";
import { GetAnswersDto } from "./dto/get-answers.dto";
import { AnswerValidationPipe } from "./pipe/answer-validation.pipe";
import { StudentAnswer } from "./postexam.model";

@Controller("postexams")
export class PostexamsController {
  constructor(private readonly postexamsService: PostexamsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async postExamTasking(
    @Body("examId") getAnswersDto: GetAnswersDto,
    @Body("answers", AnswerValidationPipe) answers: StudentAnswer[]
  ) {
    return await this.postexamsService.postExamTasking(getAnswersDto, answers, {
      email: "gmail@gmail.com"
    });
  }
}
