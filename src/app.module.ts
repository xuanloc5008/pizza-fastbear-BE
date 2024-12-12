import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseService } from './database/database.service';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: 'duongthanhtuss',
    signOptions: { expiresIn: '1h' },
  }), OrderModule, MenuModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
  exports: [DatabaseService]
})
export class AppModule {}
