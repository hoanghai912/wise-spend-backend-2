import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionSchema } from './schemas/transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
