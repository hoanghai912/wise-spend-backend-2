import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Category } from 'src/category/schemas/category.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
    @Prop()
    amount: number;

    // @Prop()
    // isIncome: boolean;

    // @Prop({ type: Types.ObjectId, ref: 'Category' })
    // category_id: Types.ObjectId;
    @Prop()
    category: string;

    @Prop()
    description: string;


    @Prop({ type: Types.ObjectId, ref: 'User' })
    user_id: Types.ObjectId;

    @Prop()
    date: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
