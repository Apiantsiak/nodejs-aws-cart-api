import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import 'dotenv/config';
import { Product } from './cart/entities/Product';
import { CartItem } from './cart/entities/CartItem';
import { Cart } from './cart/entities/Cart';
import { Order } from './order/entities/Order'

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [Product, CartItem, Cart, Order],
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false
      }

    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule { }
