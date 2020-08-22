import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from "@nestjs/common";
import { PostexamsService } from "./postexams.service";
import { GetAnswersDto } from "./dto/get-answers.dto";
import { AnswerValidationPipe } from "./pipe/answer-validation.pipe";
import { StudentAnswer } from "./postexam.model";
import { AuthGuard } from "@nestjs/passport";

@Controller("postexams")
export class PostexamsController {
  constructor(private readonly postexamsService: PostexamsService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  async postExamTasking(
    @Body() getAnswersDto: GetAnswersDto,
    @Body("answers", AnswerValidationPipe) answers: StudentAnswer[],
    @Req() req
  ) {
    return await this.postexamsService.postExamTasking(
      getAnswersDto,
      answers,
      req.user
    );
  }
}
