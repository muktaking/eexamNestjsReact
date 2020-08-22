import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as _ from "lodash";
import { ExamProfile, ExamStat } from "./profile.model";
import { Exam } from "./exam.model";
import { to } from "src/utils/utils";
import { Question, QType, Stem } from "src/questions/question.model";
import { CreateExamDto } from "./dto/exam.dto";

@Injectable()
export class ExamsService {
  constructor(
    @InjectModel("ExamProfile")
    private readonly ExamProfileModel: Model<ExamProfile>,
    @InjectModel("Exam")
    private readonly ExamModel: Model<Exam>,
    @InjectModel("Question") private readonly QuestionModel: Model<Question> //@InjectModel("User") private readonly UserModel: Model<User>
  ) {}

  async findUserExamInfo(email: string) {
    const examTotalNumber = await this.findExamTotalNumber();
    const examTotalTaken = await this.findTotalExamTaken(email);
    const rank = 1; //need to implement later
    const totalStudent = 1000; //need to implement later
    const upcomingExam = await this.findLatestExam();
    const result = await this.getUserAvgResult(email);

    const [err, examTotal] = await to(this.ExamModel.find().count());
    if (err) throw new InternalServerErrorException();
    return {
      totalExam: [examTotalNumber, examTotalTaken],
      rank: [rank, totalStudent],
      upcomingExam: [upcomingExam.title, upcomingExam.createdAt],
      result: [...result],
    };
  }

  async findTotalExamTaken(email: string) {
    const [err, profile] = await to(
      this.ExamProfileModel.findOne({
        user: email,
      })
    );
    if (err) throw new InternalServerErrorException();
    if (profile) return profile.exams.length;
    return 0;
  }

  async findExamTotalNumber() {
    const [err, examTotal] = await to(this.ExamModel.find().count());
    if (err) throw new InternalServerErrorException();
    return examTotal;
  }

  async findAllExams() {
    const [err, exams] = await to(
      this.ExamModel.find(
        {},
        { _id: 1, title: 1, type: 1, description: 1, createdAt: 1 }
      ).sort({ _id: -1 })
    );
    if (err) throw new InternalServerErrorException();

    return exams;
  }
  async findLatestExam() {
    const [err, [examLatest]] = await to(
      this.ExamModel.find({}, { _id: 1, title: 1, type: 1, createdAt: 1 })
        .limit(1)
        .sort({ _id: -1 })
    );
    if (err) throw new InternalServerErrorException();
    return examLatest;
  }

  async findExamById(id: string) {
    const [err, exam] = await to(
      this.ExamModel.findOne({ _id: id }, { __v: 0 })
    );
    if (err) throw new InternalServerErrorException();
    return exam;
  }

  // <--------------------->
  async findQuestionsByExamId(id: string) {
    const exam = await this.findExamById(id);
    if (exam) {
      let [err, questions] = await to(
        this.QuestionModel.find(
          { _id: { $in: exam.questions } },
          { _id: 1, qType: 1, qText: 1, stems: 1 }
        )
      );
      if (err) throw new InternalServerErrorException();

      questions.map((question) => {
        question.stems.map((stem, index) => {
          question.stems[index] = stem.qStem; //_.pick(stem, ["qStem"]);
        });
      });
      return {
        exam: {
          id: exam._id,
          singleQuestionMark: exam.singleQuestionMark,
          singleStemMark: exam.singleStemMark,
          penaltyMark: exam.penaltyMark,
          timeLimit: exam.timeLimit,
        },
        questions,
      };
    }
  }

  // <----------------------->
  async findProfileByUserEmail(
    email: string
    //examId: string
  ): Promise<ExamProfile> {
    const [err, profile] = await to(
      this.ExamProfileModel.findOne({
        user: email,
        // $and: [{ "exams._id": examId }, { user: email }],
      })
    );
    if (err) throw new InternalServerErrorException();
    return profile;
  }
  async getUserAvgResult(email: string) {
    const [err, profile] = await to(
      this.ExamProfileModel.findOne({
        user: email,
      })
    );
    if (err) throw new InternalServerErrorException();
    let totalAvgScore = 0;
    let totalMark = 0;
    profile &&
      profile.exams.map((e) => {
        totalAvgScore += e.averageScore;
        totalMark += e.totalMark;
      });
    return [totalAvgScore.toFixed(2), totalMark.toFixed(2)];
  }
  //<-------------------------------->
  async createExam(createExamDto: CreateExamDto, creator: string) {
    const {
      title,
      type,
      categoryType,
      description,
      questions,
      singleQuestionMark,
      penaltyMark,
      timeLimit,
    } = createExamDto;
    const exam = new this.ExamModel({
      title,
      type,
      categoryType,
      description,
      questions,
      singleQuestionMark,
      penaltyMark,
      timeLimit,
      creator,
    });
    const [err, result] = await to(exam.save());
    if (err) {
      //console.log(err);
      throw new InternalServerErrorException();
    }
    return result;
  }

  //<--------------------- Answers Validation starts ------------->

  //Gobal
  // private singleQuestionMark: number; //mark of each questions in a paper
  // private singleStemMark: number; //mark of each stem in a stem
  // private penaltyMark: number; // mark for each wrong stem
  // private timeLimit: number;
  // private totalMark: number; // total mark for the exam
  // private totalScore: number = 0; // examinee aqired score

  // //an object should pass from front--> {examId,[],timeTakenToComplete,user}

  // async postExamTasking(
  //   examId: string,
  //   answersByStudent: Array<StudentAnswer>,
  //   user
  // ) {
  //   /// answersByStudent[{id,stems[],type}] // stems[0/1/undefined]

  //   const exam: Exam = await this.findExamById(examId); //1. Get the exam details by id
  //   let profile: ExamProfile = await this.findProfileByUserEmail(
  //     //2. get the exam profile of user
  //     user.email,
  //     examId
  //   );
  //   let examStat: ExamStat = {
  //     // creating a null exam stat
  //     _id: null,
  //     attemptNumbers: null,
  //     averageScore: 0,
  //     firstAttemptTime: null,
  //     lastAttemptTime: null
  //   };

  //   // populate some Global variables
  //   this.singleQuestionMark = exam.singleQuestionMark;
  //   this.singleStemMark = exam.singleStemMark;
  //   this.penaltyMark = exam.penaltyMark;
  //   this.timeLimit = exam.timeLimit;
  //   this.totalMark = Math.ceil(this.singleQuestionMark * exam.questions.length); // simple math

  //   //exam profile starts

  //   if (!profile) {
  //     // if user has no profile && has no previous attempt to this exam
  //     profile = new this.ExamProfileModel(); // then, create a new exam profile & exam stat
  //     examStat._id = examId;
  //     examStat.attemptNumbers = 1;
  //     examStat.firstAttemptTime = Date.now();
  //     examStat.lastAttemptTime = Date.now();
  //     profile.user = user.email;
  //     // average score have to add later, so exams key of profile will be added later
  //   } else {
  //     [examStat] = profile.exams.filter(exam => exam._id == examId); // if user previously attempted
  //     examStat.attemptNumbers++;
  //     examStat.lastAttemptTime = Date.now();
  //   }

  //   //answer manipulation is started here

  //   answersByStudent = answersByStudent.filter(v => v.stems.length > 0); //the empty stems answer object are rejected
  //   answersByStudent = _.sortBy(answersByStudent, o => o.id); // sort answer by ids,
  //   // answersByStudent is sorted by id. Because we will match these answers with database saved answer that is also
  //   //sorted by id
  //   const questionIds = answersByStudent.map(v => v.id); // get the questions ids that is also answer id

  //   const [err, questions] = await to(
  //     //fetch the questions
  //     this.QuestionModel.find({ _id: { $in: questionIds } })
  //       .sort({ _id: 1 })
  //       .select({
  //         qText: 1,
  //         stems: 1,
  //         qType: 1,
  //         generalFeedback: 1
  //       })
  //   );
  //   if (err) throw new InternalServerErrorException();

  //   //const answersByServer = this.answersExtractor(questions);

  //   const resultArray: Array<Particulars> = []; //result array will hold the total result

  //   //main algorithm starts

  //   questions.map((question, index) => {
  //     // mapping questions to validate answer and make marksheet

  //     const particulars: Particulars = {
  //       // particulars is the block of data passed to forntend to show result
  //       id: question._id,
  //       qText: question.qText,
  //       stems: question.stems,
  //       generalFeedback: question.generalFeedback,
  //       result: { mark: 0 }
  //     };

  //     if (question.qType === QType.Matrix) {
  //       particulars.result = this.matrixManipulator(
  //         this.answersExtractor(question),
  //         answersByStudent[index]
  //       );
  //     } else if (question.qType === QType.singleBestAnswer) {
  //       particulars.result = this.sbaManipulator(
  //         this.answersExtractor(question),
  //         answersByStudent[index]
  //       );
  //     }
  //     resultArray.push(particulars);
  //   });

  //   examStat.averageScore = this.totalScore;

  //   if (examStat.attemptNumbers == 1) profile.exams.push(examStat);
  //   console.log(profile);
  //   const [error, result] = await to(profile.save());
  //   console.log(error);
  //   if (error) throw new InternalServerErrorException();

  //   const totalScorePercentage =
  //     +(this.totalScore / this.totalMark).toFixed(2) * 100;
  //   return { resultArray, totalScore: this.totalScore, totalScorePercentage };
  //   // const [matrixQuestions, sbaQuestions] = this.questionsExtractedByQType(
  //   //   questions
  //   // );

  //   // const [matrixAnswers, sbaAnswers] = this.answersExtractedByQType(
  //   //   matrixQuestions,
  //   //   sbaQuestions
  //   // );

  //   // const [matrixAnswersByStudent, sbaAnswersByStudent] = [
  //   //   answersByStudent.filter(ans => ans.type == QType.Matrix),
  //   //   answersByStudent.filter(ans => ans.type == QType.singleBestAnswer)
  //   // ];
  //   // const result = [];
  //   // matrixQuestions.map((ques, index) => {
  //   //   const particulars = this.particularsDeliveryByComparison(
  //   //     answersByStudent,
  //   //     ques
  //   //   );
  //   //   particulars.answer = this.matrixManipulator(
  //   //     particulars.answer,
  //   //     matrixAnswers[index]
  //   //   );
  //   //   result.push();
  //   // });
  //   // sbaQuestions.map((ques, index) => {
  //   //   const particulars = this.particularsDeliveryByComparison(
  //   //     answersByStudent,
  //   //     ques
  //   //   );
  //   //   this.sbaManipulator(particulars.answer, sbaAnswers[index]);
  //   // });
  //   // answersByStudent.map(answer => {
  //   //   if (answer.type === QType.Matrix) {
  //   //     matrixManipulator(answer.id,answer.stems,);
  //   //   } else if (answer.type === QType.singleBestAnswer) {
  //   //     sbaManipulator();
  //   //   }
  //   // });
  // }

  // // private particularsDeliveryByComparison(answers, question) {
  // //   const [answer] = answers.filter(ans => {
  // //     return ans.id == question._id;
  // //   });
  // //   const result = {
  // //     answer: answer.stems,
  // //     qText: question.qText,
  // //     qStem: question.stems.map(stem => {
  // //       return stem.qStem;
  // //     }),
  // //     fbStem: question.stems.map(stem => {
  // //       return stem.fbStem;
  // //     }),
  // //     generalFeedback: question.generalFeedback
  // //   };
  // //   return result;
  // // }

  // // //ends

  // // //starts
  // // private questionsExtractedByQType(questions) {
  // //   return [
  // //     questions.filter(question => question.qType === QType.Matrix),
  // //     questions.filter(question => question.qType === QType.singleBestAnswer)
  // //   ];
  // // }
  // // //ends

  // // //starts
  // // private answersExtractedByQType(matrixQuestions, sbaQuestions) {
  // //   return [
  // //     matrixQuestions.map(question => {
  // //       return question.stems.map(stem => {
  // //         return stem.aStem;
  // //       });
  // //     }),
  // //     sbaQuestions.map(question => {
  // //       return question.stems.map(stem => {
  // //         return stem.aStem;
  // //       });
  // //     })
  // //   ];
  // // }

  // // //ends

  // // //starts
  // // private matrixManipulator(studentAns, serverAns) {
  // //   const miniResultSheet = studentAns.answer.map((v, i) => v === serverAns[i]);
  // //   const correct = miniResultSheet.filter(v => v).length;
  // //   const wrong = miniResultSheet.length - correct;
  // //   const mark = +(
  // //     +(+this.singleQuestionMark * correct).toFixed(2) -
  // //     +(this.penaltyMark * wrong).toFixed(2)
  // //   ).toFixed(2);

  // //   return { result: miniResultSheet, mark };
  // // }
  // // private sbaManipulator(ans, ques) {}

  // private answersExtractor(question: Question): Array<string> {
  //   return question.stems.map(stem => {
  //     return stem.aStem;
  //   });
  // }

  // //ends

  // //starts
  // private matrixManipulator(
  //   serverAns: Array<string>,
  //   studentAns: StudentAnswer
  // ): Result {
  //   const stemValidatedArray = studentAns.stems.map(
  //     (v, i) => v === serverAns[i]
  //   );
  //   const correct = stemValidatedArray.filter(v => v).length;
  //   const wrong = stemValidatedArray.length - correct;
  //   const mark = +(
  //     +(+this.singleStemMark * correct).toFixed(2) -
  //     +(this.penaltyMark * wrong).toFixed(2)
  //   ).toFixed(2);
  //   this.totalScore += mark;
  //   return { matrixResult: stemValidatedArray, mark };
  // }

  // //ends

  // //starts
  // private sbaManipulator(
  //   serverAns: Array<string>,
  //   studentAns: StudentAnswer
  // ): Result {
  //   const mark =
  //     studentAns.stems[0] === serverAns[0] ? this.singleQuestionMark : 0;
  //   this.totalScore += mark;
  //   return { sbaResult: +serverAns[0], mark };
  // }
}

// export interface Particulars {
//   id: string;
//   qText: string;
//   stems: Stem;
//   generalFeedback: string;
//   result: Result;
// }

// export interface Result {
//   matrixResult?: Array<boolean>;
//   sbaResult?: number;
//   mark: number;
// }

// export interface StudentAnswer {
//   id: string;
//   stems: Array<string>;
//   type: QType;
// }
