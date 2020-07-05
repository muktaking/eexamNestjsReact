import { IsNotEmpty, IsMongoId } from "class-validator";

export class GetAnswersDto {
  @IsNotEmpty()
  @IsMongoId()
  examId: string;

  @IsNotEmpty()
  timeTakenToComplete: number;
}
