import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from './Product';
import { Cart } from './Cart';
import { Order } from '../../order/entities/Order'

@Entity("cart_item")
export class CartItem {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'product_id' })
  product: Product;


  @ManyToOne(() => Cart, (cart) => cart.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column()
  count: number;

  @ManyToOne(() => Order, order => order.items)
  order: Order;
}
