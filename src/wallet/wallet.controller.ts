import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './schemas/wallet.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('wallets')
@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  @ApiOperation({ summary: 'Get all wallets', description: 'Retrieve all wallets' })
  @ApiResponse({ status: 200, description: 'Returns all wallets' })
  async getAllWallets(): Promise<Wallet[]> {
    return this.walletService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a wallet', description: 'Create a new wallet' })
  @ApiBody({ type: CreateWalletDto })
  @ApiResponse({ status: 201, description: 'The wallet has been successfully created' })
  async createWallet(@Body() wallet: CreateWalletDto): Promise<Wallet> {
    return this.walletService.create(wallet);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a wallet by ID', description: 'Retrieve a wallet by its ID' })
  @ApiParam({ name: 'id', description: 'ID of the wallet' })
  @ApiResponse({ status: 200, description: 'Returns the wallet with the specified ID' })
  async getWallet(@Param('id') id: string): Promise<Wallet> {
    return this.walletService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a wallet by ID', description: 'Update a wallet with the specified ID' })
  @ApiParam({ name: 'id', description: 'ID of the wallet' })
  @ApiBody({ type: UpdateWalletDto })
  @ApiResponse({ status: 200, description: 'Returns the updated wallet' })
  async updateWallet(@Param('id') id: string, @Body() wallet: UpdateWalletDto): Promise<Wallet> {
    return this.walletService.updateById(id, wallet);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wallet by ID', description: 'Delete a wallet with the specified ID' })
  @ApiParam({ name: 'id', description: 'ID of the wallet' })
  @ApiResponse({ status: 200, description: 'Returns the deleted wallet' })
  async deleteWallet(@Param('id') id: string): Promise<Wallet> {
    return this.walletService.deleteById(id);
  }
}
