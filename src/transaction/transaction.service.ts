import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Transaction } from './schemas/transaction.schema';


@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: mongoose.Model<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    const transactions = await this.transactionModel.find();
    return transactions;
  }
  async create(transaction: Transaction): Promise<Transaction> {
    const res = await this.transactionModel.create(transaction);
    return res;
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id);

    if (!transaction) {
      throw new NotFoundException('transaction not found.');
    }

    return transaction;
  }

  async updateById(id: string, transaction: Transaction): Promise<Transaction> {
    return await this.transactionModel.findByIdAndUpdate(id, transaction, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Transaction> {
    return await this.transactionModel.findByIdAndDelete(id);
  }

//   update(id: string, transaction: Transaction): Promise<Transaction> {
//     return this.transactionModel.findByIdAndUpdate(id, transaction, { new: true }).exec();
// }

}
