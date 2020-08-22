import { ExamType } from "../exam.model";
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsMongoId,
  IsOptional,
} from "class-validator";

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum([
    ExamType.Assignment.toString(),
    ExamType.Weekly.toString(),
    ExamType.Monthly.toString(),
    ExamType.Term.toString(),
    ExamType.Assesment.toString(),
    ExamType.Test.toString(),
    ExamType.Final.toString(),
  ])
  type: ExamType;

  @IsNotEmpty()
  @IsMongoId({ each: true })
  categoryType: Array<string>;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsMongoId({ each: true })
  questions: Array<string>;

  @IsOptional()
  @IsNotEmpty()
  singleQuestionMark: number;

  @IsOptional()
  @IsNotEmpty()
  singleStemMark: number;

  @IsOptional()
  @IsNotEmpty()
  penaltyMark: number;

  @IsOptional()
  @IsNotEmpty()
  timeLimit: number;
}

export class FindExamDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
