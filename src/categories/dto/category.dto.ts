import {
  IsNotEmpty,
  MaxLength,
  IsString,
  IsOptional,
  IsNotIn,
  MinLength,
  IsMongoId,
  ValidateIf,
  IsNumberString,
} from "class-validator";

export class createCategoryDto {
  @IsOptional()
  @ValidateIf((o) => o.id !== "Top")
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  @IsNotIn(["_", "/"])
  name: string;

  @IsOptional()
  @IsString()
  @IsNotIn(["_", "/"])
  slug: string;

  @MinLength(30)
  @MaxLength(300)
  @IsString()
  description: string;

  @ValidateIf((o) => o.parentId !== "Top")
  @IsMongoId()
  parentId: string;

  @IsOptional()
  @IsNumberString()
  order: number;
}
