import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../schemas/wallet.schema';

export class CreateWalletDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly income: number;

  @ApiProperty()
  readonly expense: number;

  @ApiProperty()
  readonly category: Category;

  @ApiProperty()
  readonly description: string;
}
