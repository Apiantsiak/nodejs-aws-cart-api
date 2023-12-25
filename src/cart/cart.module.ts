import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../order/order.module';
import { Cart } from './entities/Cart';
import { CartItem } from './entities/CartItem';
import { Product } from './entities/Product';

import { CartController } from './cart.controller';
import { CartService } from './services';


@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([Cart, CartItem, Product])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule { }
