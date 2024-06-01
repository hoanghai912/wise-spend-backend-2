import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly logo: string;

  @ApiProperty()
  readonly budget: number;
}
