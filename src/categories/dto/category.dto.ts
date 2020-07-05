import {
  IsNotEmpty,
  MaxLength,
  IsString,
  IsOptional,
  IsNotIn,
  MinLength,
  IsMongoId
} from "class-validator";

export class createCategoryDto {
  @IsOptional()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  @IsNotIn(["_"])
  name: string;

  @MinLength(30)
  @MaxLength(300)
  @IsString()
  description: string;

  @IsString()
  parentId: string;

  @IsOptional()
  order: number;
}
