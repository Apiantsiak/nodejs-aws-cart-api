import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CartItem } from './CartItem';
import { CartStatuses } from "../models";
import { Order } from '../../order/entities/Order'

@Entity("cart")
export class Cart {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToMany(() => CartItem, item => item.cart)
  items: CartItem[];

  @Column({ type: "enum", enum: CartStatuses, default: CartStatuses.OPEN })
  status: CartStatuses;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;


  @OneToMany(() => Order, (order) => order.cart)
  order: Order[]
}


