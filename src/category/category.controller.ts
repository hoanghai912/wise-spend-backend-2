import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Post()
  async createCategory(
    @Body()
    category: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Get(':id')
  async getCategory(
    @Param('id')
    id: string,
  ): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id')
    id: string,
    @Body()
    category: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateById(id, category);
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id')
    id: string,
  ): Promise<Category> {
    return this.categoryService.deleteById(id);
  }
}
