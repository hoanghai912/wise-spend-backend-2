import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Wallet } from './schemas/wallet.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private walletModel: mongoose.Model<Wallet>,
  ) {}

  async findAll(): Promise<Wallet[]> {
    const wallets = await this.walletModel.find();
    return wallets;
  }

  async create(wallet: Wallet): Promise<Wallet> {
    const res = await this.walletModel.create(wallet);
    return res;
  }

  async findById(id: string): Promise<Wallet> {
    const wallet = await this.walletModel.findById(id);

    if (!wallet) {
      throw new NotFoundException('wallet not found.');
    }

    return wallet;
  }

  async updateById(id: string, wallet: Wallet): Promise<Wallet> {
    return await this.walletModel.findByIdAndUpdate(id, wallet, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Wallet> {
    return await this.walletModel.findByIdAndDelete(id);
  }
}
