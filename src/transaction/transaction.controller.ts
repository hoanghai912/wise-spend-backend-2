import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { TransactionService } from './transaction.service';
  import { CreateTransactionDto } from './dto/create-transaction.dto';
  import { UpdateTransactionDto } from './dto/update-transaction.dto';
  import { Transaction } from './schemas/transaction.schema';
import { ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Transaction')
  @Controller('transaction')
  export class TransactionController {
    constructor(private transactionService: TransactionService) {}
  
    @Get()
    async getAllTransactions(): Promise<Transaction[]> {
      return this.transactionService.findAll();
    }
  
    @Post()
    async createTransaction(
      @Body()
      transaction: CreateTransactionDto,
    ): Promise<{message:string}> {
      this.transactionService.create(transaction);
      // return this.transactionService.create(transaction);
      return {'message':'successful'}

    }
  
    @Get(':id')
    async getTransaction(
      @Param('id')
      id: string,
    ): Promise<Transaction> {
      return this.transactionService.findById(id);
    }

    @Get('/user_id/:user_id')
    async getTransactionByUser(
      @Param('user_id')
      user_id: string,
    ): Promise<Transaction[]> {
      return this.transactionService.findByUserId(user_id);
    }

    @Put(':id')
    async updateTransaction(
      @Param('id')
      id: string,
      @Body()
      transaction: UpdateTransactionDto,
    ): Promise<Transaction> {
      return this.transactionService.updateById(id, transaction);
    }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() transaction: Transaction): Promise<Transaction> {
    //     return this.transactionService.update(id, transaction);
    // }

    @Delete(':id')
    async deleteTransaction(
      @Param('id')
      id: string,
    ): Promise<Transaction> {
      return this.transactionService.deleteById(id);
    }
  }
  