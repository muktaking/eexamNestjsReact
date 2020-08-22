import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as XLSX from "xlsx";
import * as fs from "fs";
import * as _ from "lodash";

import { Question, Stem } from "./question.model";
import { CreateQuestionDto } from "./create-question.dto";
import { to } from "src/utils/utils";
import { ValidationError } from "class-validator";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel("Question") private readonly QuestionModel: Model<Question>
  ) {}

  async findAllQuestions() {
    const [err, questions] = await to(this.QuestionModel.find());
    if (err) throw new InternalServerErrorException();
    return questions;
  }

  async findQuestionByFilter(filterName, filterValue) {
    filterName = filterName === "id" ? "_id" : filterName;
    const [err, result] = await to(
      this.QuestionModel.find({ [filterName]: filterValue })
    );
    if (err) throw new InternalServerErrorException();
    return result;
  }

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
    stem: { stem: Stem; error: string },
    creator: string
  ) {
    const {
      title,
      category,
      qType,
      qText,
      generalFeedback,
      tags,
    } = createQuestionDto;
    const stems = stem.stem;

    const question = new this.QuestionModel({
      title,
      category,
      qType,
      qText,
      stems,
      generalFeedback,
      tags,
      creator,
    });
    const [err, result] = await to(question.save());
    if (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
    return { result, message: stem.error };
  }

  async createQuestionByUpload(creator, category, file) {
    let excel = "";
    let data = [];
    try {
      excel = file.path;
      const workbook = XLSX.readFile(excel);
      data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
        header: 1,
        raw: false,
        defval: "",
      });
      //console.log(data);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    fs.unlink(excel, (err) => {
      if (err) {
        console.log(err);
      }
    });

    try {
      data.shift();
      const result = this.toCollection(data, category, creator);
      if (result.allData.length > 1) {
        const isSaved = await this.QuestionModel.insertMany(result.allData);
        return isSaved;
        // if (isSaved) {
        //     return res.status(200).send(`<div>${result.allData}</div><div>${result.errorIndex}</div><div>${result.errorMessage}</div>`);
        // } else {
        //     //console.log(isSaved);
        //     return res.redirect('/question/addQuestion?qType=excel')
        // }
      }
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  async updateQuestionById(
    createQuestionDto: CreateQuestionDto,
    stems: { stem: Stem; error: string },
    creator: string
  ) {
    const {
      id,
      title,
      category,
      qType,
      qText,
      generalFeedback,
      tags,
    } = createQuestionDto;

    let [error, updatedQuestion] = await this.QuestionModel.updateOne(
      { _id: id },
      {
        title,
        category,
        qType,
        qText,
        stems: stems.stem,
        generalFeedback,
        tags,
        modifiedDate: Date.now(),
        modifiedBy: creator,
      }
    );
    if (error) throw new InternalServerErrorException();
    return updatedQuestion;
  }

  // function to validate and convert uploaded excel data into a collection
  private toCollection(data, category, user) {
    // const category = category;
    // const user = user;
    const allData = [];
    const errorIndex = [];
    const errorMessage = [];

    data.forEach((element, index) => {
      const stems = [];

      //validating inputs
      //title(0),qtype(1),text(2),stem(3-7),ans(8-12),feed(13-17),gf(18),tags(19)
      if (element[0] === "") {
        errorIndex.push(index + 1);
        errorMessage.push("A question Title can not be Empty");
        return;
      }
      if (element[1] === "") {
        errorIndex.push(index + 1);
        errorMessage.push("A question Type can not be Empty");
        return;
      }
      if (element[2] === "") {
        errorIndex.push(index + 1);
        errorMessage.push("A question Text can not be Empty");
        return;
      }
      if (element[3] === "") {
        errorIndex.push(index + 1);
        errorMessage.push("First stem can not be empty.");
        return;
      }
      for (let i = 3; i < 8; i++) {
        if (element[i] === "" && element[i + 10] !== "") {
          errorIndex.push(index + 1);
          errorMessage.push("Feedback Can not be on empty stems.");
          return;
        }
      }
      if (element[1] === "matrix") {
        for (let i = 3; i < 8; i++) {
          if (
            (element[i] !== "" && element[i + 5] === "") ||
            (element[i + 5] !== "" && element[i] === "")
          ) {
            errorIndex.push(index + 1);
            errorMessage.push(
              "Stem should have corresponding answer and vice versa."
            );
            return;
          }
        }
      }

      for (let i = 3; i < 8; i++) {
        let stem: Stem = {
          qStem: "",
          aStem: "",
          fbStem: "",
        };
        stem.qStem = element[i] !== "" ? element[i] : null;
        stem.aStem = element[i + 5] !== "" ? element[i + 5] : null;
        stem.fbStem = element[i + 10] !== "" ? element[i + 10] : null;
        //console.log("----------------", stem);
        if (stem.qStem && stem.aStem) stems.push(stem);
      }
      console.log("-------------");
      console.log(stems);
      console.log("-------------");
      allData.push({
        title: element[0],
        category,
        creator: user,
        qType: element[1],
        qText: element[2],
        stems: stems,
        generalFeedbacks: element[18],
        tags: _.words(element[19]),
      });
    });
    return {
      allData,
      errorIndex,
      errorMessage,
    };
  }
}
