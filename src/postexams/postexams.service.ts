import {
  Injectable,
  InternalServerErrorException,
  Scope,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as _ from "lodash";
import { Exam } from "src/exams/exam.model";
import { ExamsService } from "src/exams/exams.service";
import { ExamProfile, ExamStat } from "src/exams/profile.model";
import { to } from "src/utils/utils";
import { Particulars, Result, StudentAnswer } from "./postexam.model";
import { QType, Question } from "src/questions/question.model";
import { GetAnswersDto } from "./dto/get-answers.dto";

@Injectable({ scope: Scope.REQUEST })
export class PostexamsService {
  constructor(
    @InjectModel("ExamProfile")
    private readonly ExamProfileModel: Model<ExamProfile>,
    @InjectModel("Question") private readonly QuestionModel: Model<Question>,
    private readonly examService: ExamsService
  ) {}

  //Gobal
  private singleQuestionMark: number; //mark of each questions in a paper
  private singleStemMark: number; //mark of each stem in a stem
  private penaltyMark: number; // mark for each wrong stem
  private timeLimit: number;
  private totalMark: number; // total mark for the exam
  private totalScore: number = 0; // examinee aqired score

  //an object should pass from front--> {examId,[],timeTakenToComplete,user}

  async postExamTasking(
    getAnswersDto: GetAnswersDto,
    answersByStudent: Array<StudentAnswer>,
    user
  ) {
    /// answersByStudent[{id,stems[],type}] // stems[0/1/undefined]
    const { examId, timeTakenToComplete } = getAnswersDto;

    const exam: Exam = await this.examService.findExamById(examId); //1. Get the exam details by id
    let profile: ExamProfile = await this.examService.findProfileByUserEmail(
      //2. get the exam profile of user
      user.email
      //examId
    );
    let examStat: ExamStat = {
      // creating a null exam stat
      _id: null,
      attemptNumbers: null,
      averageScore: 0,
      totalMark: null,
      firstAttemptTime: null,
      lastAttemptTime: null,
    };
    // populate some Global variables
    this.singleQuestionMark = exam.singleQuestionMark;
    this.singleStemMark = exam.singleStemMark;
    this.penaltyMark = exam.penaltyMark;
    this.timeLimit = exam.timeLimit;
    this.totalMark = Math.ceil(this.singleQuestionMark * exam.questions.length); // simple math
    //this.totalScore = 0;

    //exam profile starts

    if (!profile) {
      // if user has no profile && has no previous attempt to this exam
      profile = new this.ExamProfileModel(); // then, create a new exam profile & exam stat
      examStat._id = examId;
      examStat.attemptNumbers = 1;
      examStat.totalMark = this.totalMark;
      examStat.firstAttemptTime = Date.now();
      examStat.lastAttemptTime = Date.now();
      profile.user = user.email;
      // average score have to add later, so exams key of profile will be added later
    } else {
      [examStat] = profile.exams.filter((exam) => exam._id == examId); // if user previously attempted
      if (!examStat) {
        examStat = {
          _id: examId,
          attemptNumbers: 1,
          totalMark: this.totalMark,
          firstAttemptTime: Date.now(),
          lastAttemptTime: Date.now(),
          averageScore: 0,
        };
      } else {
        examStat.totalMark = this.totalMark;
        examStat.attemptNumbers++;
        examStat.lastAttemptTime = Date.now();
      }
    }

    //answer manipulation is started here
    // console.log(answersByStudent);
    answersByStudent = answersByStudent.filter((v) => v.stems.length > 0); //the empty stems answer object are rejected
    answersByStudent = _.sortBy(answersByStudent, (o) => o.id); // sort answer by ids,
    // answersByStudent is sorted by id. Because we will match these answers with database saved answer that is also
    //sorted by id
    const questionIds = answersByStudent.map((v) => v.id); // get the questions ids that is also answer id

    const [err, questions] = await to(
      //fetch the questions
      this.QuestionModel.find({ _id: { $in: questionIds } })
        .sort({ _id: 1 })
        .select({
          qText: 1,
          stems: 1,
          qType: 1,
          generalFeedback: 1,
        })
    );
    if (err) throw new InternalServerErrorException();

    //const answersByServer = this.answersExtractor(questions);

    const resultArray: Array<Particulars> = []; //result array will hold the total result

    //main algorithm starts

    questions.map((question, index) => {
      // mapping questions to validate answer and make marksheet

      const particulars: Particulars = {
        // particulars is the block of data passed to forntend to show result
        id: question._id,
        qText: question.qText,
        stems: question.stems,
        generalFeedback: question.generalFeedback,
        result: { mark: 0 },
      };

      if (question.qType === QType.Matrix) {
        particulars.result = this.matrixManipulator(
          this.answersExtractor(question),
          answersByStudent[index]
        );
      } else if (question.qType === QType.singleBestAnswer) {
        particulars.result = this.sbaManipulator(
          this.answersExtractor(question),
          answersByStudent[index]
        );
      }
      resultArray.push(particulars);
    });

    examStat.averageScore = this.totalScore;

    if (examStat.attemptNumbers == 1) profile.exams.push(examStat);
    const [error, result] = await to(profile.save());

    if (error) throw new InternalServerErrorException();

    const totalScorePercentage =
      +(this.totalScore / this.totalMark).toFixed(2) * 100;
    return {
      resultArray,
      totalMark: this.totalMark,
      totalScore: this.totalScore,
      totalScorePercentage,
    };
  }

  private answersExtractor(question: Question): Array<string> {
    return question.stems.map((stem) => {
      return stem.aStem;
    });
  }

  //ends

  //starts
  private matrixManipulator(
    serverAns: Array<string>,
    studentAns: StudentAnswer
  ): Result {
    console.log(studentAns, serverAns);
    const stemValidatedArray = serverAns.map((v, i) =>
      studentAns.stems[i] !== null ? v === studentAns.stems[i] : false
    );
    const correct = stemValidatedArray.filter((v) => v).length;
    const wrong = stemValidatedArray.length - correct;
    const mark = +(
      +(+this.singleStemMark * correct).toFixed(2) -
      Number((this.penaltyMark * wrong).toFixed(2))
    ).toFixed(2);
    this.totalScore += mark;
    return { stemResult: stemValidatedArray, mark };
  }

  //ends

  //starts
  private sbaManipulator(
    serverAns: Array<string>,
    studentAns: StudentAnswer
  ): Result {
    const mark =
      studentAns.stems[0] === serverAns[0] ? this.singleQuestionMark : 0;
    this.totalScore += mark;
    return { stemResult: +serverAns[0], mark };
  }
}
