import { Module } from "@nestjs/common";
import { PostexamsController } from "./postexams.controller";
import { PostexamsService } from "./postexams.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ExamProfileSchema } from "src/exams/profile.model";
import { ExamSchema } from "src/exams/exam.model";
import { QuestionSchema } from "src/questions/question.model";
import { ExamsService } from "src/exams/exams.service";
import { ExamsModule } from "src/exams/exams.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "ExamProfile", schema: ExamProfileSchema },
      //{ name: "Exam", schema: ExamSchema },
      { name: "Question", schema: QuestionSchema }
    ]),
    ExamsModule
  ],
  controllers: [PostexamsController],
  providers: [PostexamsService]
})
export class PostexamsModule {}
