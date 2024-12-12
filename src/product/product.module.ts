import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [ProductService, DatabaseService],
  controllers: [ProductController]
})
export class ProductModule {}
