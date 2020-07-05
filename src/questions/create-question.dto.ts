import {
  IsOptional,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEnum,
  IsDate
} from "class-validator";
import { QType, Stem } from "./question.model";

export class CreateQuestionDto {
  @IsOptional()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  title: string;

  @IsNotEmpty()
  @IsMongoId()
  category: string;

  @IsNotEmpty()
  @IsEnum(QType)
  qType: QType;

  @IsNotEmpty()
  @MaxLength(500)
  qText: string;

  //   stems: Partial<Stem>;
  @IsOptional()
  @IsString()
  generalFeedback: string;

  @IsOptional()
  @IsString({ each: true })
  tags: Array<string>;

  @IsOptional()
  @IsDate()
  modifiedAt: Date;

  @IsString()
  creator: string;
}
