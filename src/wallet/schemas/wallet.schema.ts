import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  SALARY = 'Salary',
  ALLOWANCE = 'Allowance',
  BONUS = 'Bonus',
  RELATIVES = 'Relatives',
  FOOD = 'Food',
  TRAVEL = 'Travel',
  ELECTRICITY = 'Electricity',
  WATER = 'Water',
  PETROL = 'Petrol',
  OTHERS = 'Others'
}

@Schema({
  timestamps: true,
})
export class Wallet {
  @Prop()
  username: string;

  @Prop()
  income: number;

  @Prop()
  expense: number;

  @Prop()
  category: Category;

  @Prop()
  description: string;


}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
