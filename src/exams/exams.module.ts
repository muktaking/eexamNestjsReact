import { Module } from "@nestjs/common";
import { ExamsController } from "./exams.controller";
import { ExamsService } from "./exams.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ExamProfileSchema } from "./profile.model";
import { ExamSchema } from "./exam.model";
import { QuestionSchema } from "src/questions/question.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "ExamProfile", schema: ExamProfileSchema },
      { name: "Exam", schema: ExamSchema },
      { name: "Question", schema: QuestionSchema }
    ])
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService]
})
export class ExamsModule {}
