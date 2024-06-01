import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// export enum Category {
//   SALARY = 'Salary',
//   ALLOWANCE = 'Allowance',
//   BONUS = 'Bonus',
//   RELATIVES = 'Relatives',
//   FOOD = 'Food',
//   TRAVEL = 'Travel',
//   ELECTRICITY = 'Electricity',
//   WATER = 'Water',
//   PETROL = 'Petrol',
//   OTHERS = 'Others'
// }

@Schema({
  timestamps: true,
})
export class Category {
  @Prop()
  name: string;

  @Prop()
  logo: string;

  @Prop()
  budget: number;


}

export const CategorySchema = SchemaFactory.createForClass(Category);
