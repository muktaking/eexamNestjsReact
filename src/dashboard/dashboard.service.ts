import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Exam } from "src/exams/exam.model";

import { to } from "src/utils/utils";
import { Category } from "src/categories/category.model";
import { ExamsService } from "src/exams/exams.service";

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel("Category")
    private readonly CategoryModel: Model<Category>,
    @InjectModel("Exam")
    private readonly ExamModel: Model<Exam>,
    private readonly examService: ExamsService
  ) {
    this.featuredCategoryId = this.getFeaturedCategoryId();
  }

  private featuredCategoryId;

  async getFeaturedCategoryId() {
    const [err, category] = await to(
      this.CategoryModel.findOne({ name: "Featured" })
    );
    if (err) throw new InternalServerErrorException();
    return category ? category._id : null;
  }

  async getStudentDashInfo() {
    const [err, userExamInfo] = await to(
      this.examService.findUserExamInfo("siraj420@gmail.com")
    );
    if (err) throw new InternalServerErrorException();
    const [err1, userExamStat] = await to(
      this.examService.findUserExamStat("siraj420@gmail.com")
    );
    if (err1) throw new InternalServerErrorException();

    const featuredExams = await this.getFeaturedExams();
    return { userExamInfo, featuredExams, userExamStat };
  }

  async getFeaturedExams() {
    const [err, exams] = await to(
      this.ExamModel.find(
        { categoryType: await this.featuredCategoryId },
        { _id: 1, title: 1, type: 1, description: 1, createdAt: 1 }
      )
        .limit(5)
        .sort({ _id: -1 })
    );
    if (err) throw new InternalServerErrorException();
    return exams;
  }
}
