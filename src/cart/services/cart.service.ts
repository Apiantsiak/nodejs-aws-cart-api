import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';
import { CartStatuses } from '../models/index'
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
  ) { }

  async findByUserId(userId: string): Promise<Cart> {
    console.log('looking for cart')
    const user = await this.cartRepository.findOne({
      relations: ['items', 'items.product'],
      where: { user_id: userId, status: CartStatuses.OPEN }
    });
    console.log('user', user);
    return user;
  }

  async createByUserId(userId: string) {
    console.log('in createByUserId');
    const id = v4();
    const userCart = this.cartRepository.create({
      id,
      items: [],
      user_id: userId
    });
    await this.cartRepository.save(userCart);
    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    console.log('in findOrCreateByUserId');
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    const user = await this.createByUserId(userId);
    return user;
  }

  async updateByUserId(userId: string, { product, count = 0 }): Promise<any> {
    const { id } = await this.findOrCreateByUserId(userId);

    const cartItem = await this.cartItemRepository.findOne({
      where: { cart: { id }, product: { id: product.id } },
    });
    if (!cartItem) {
      const id = v4();



      const { id: cartId } = await this.cartRepository.findOne({
        select: ["id"],
        where: { user_id: userId }
      });
      const newCartItem = await this.cartItemRepository.create({
        id,
        count,
        product: product.id,
        cart: { id: cartId }
      });
      await this.cartItemRepository.save(newCartItem);
    }

    if (cartItem && +count) {
      cartItem.count = count;
      await this.cartItemRepository.save(cartItem);
    }

    if (cartItem && !count) {
      await this.cartItemRepository.delete(cartItem);
    }

    const cart = this.findByUserId(userId);
    return cart;
  }

  async removeByUserId(userId): Promise<void> {
    await this.cartRepository.delete({ user_id: userId });
  }
}
