// import { Category } from '../schemas/category.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
 
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly logo: string;

  @ApiProperty()
  readonly budget: number;
}
