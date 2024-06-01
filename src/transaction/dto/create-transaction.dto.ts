import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { Category } from "src/category/schemas/category.schema";
import { User } from "src/user/schemas/user.schema";


export class CreateTransactionDto {
  @ApiProperty()
  readonly amount: number;

  @ApiProperty()
  readonly isIncome: boolean;
  // readonly category: Category;
  // readonly user: User;

  @ApiProperty()
  readonly date: Date;

  @ApiProperty()
  readonly category_id: Types.ObjectId;

  @ApiProperty()
  readonly user_id: Types.ObjectId;
}