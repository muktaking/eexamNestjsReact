import { Module } from "@nestjs/common";
import { ExamsController } from "./exams.controller";
import { ExamsService } from "./exams.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ExamProfileSchema } from "./profile.model";
import { ExamSchema } from "./exam.model";
import { QuestionSchema } from "src/questions/question.model";
import { CategorySchema } from "src/categories/category.model";
import { CategoriesModule } from "src/categories/categories.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "ExamProfile", schema: ExamProfileSchema },
      { name: "Exam", schema: ExamSchema },
      { name: "Category", schema: CategorySchema },
      { name: "Question", schema: QuestionSchema },
    ]),
    CategoriesModule,
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
