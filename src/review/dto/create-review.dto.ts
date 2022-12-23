import { IsInt, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  @Max(5)
  @Min(1, { message: 'Рейтинг не может быть меньше 1' })
  rating: number;

  @IsString()
  productId: string;
}
