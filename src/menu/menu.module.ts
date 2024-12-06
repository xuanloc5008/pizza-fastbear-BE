import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, DatabaseService]
})
export class MenuModule {}
