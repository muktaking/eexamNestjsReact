import { Module } from "@nestjs/common";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "src/categories/category.model";
import { ExamSchema } from "src/exams/exam.model";

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [
    MongooseModule.forFeature([
      { name: "Exam", schema: ExamSchema },
      { name: "Category", schema: CategorySchema },
    ]),
  ],
})
export class DashboardModule {}
