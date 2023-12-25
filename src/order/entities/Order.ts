import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { CartItem } from '../../cart/entities/CartItem';
import { Cart } from '../../cart/entities/Cart';


@Entity("order")
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => Cart, (cart) => cart.order)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @OneToMany(() => CartItem, item => item.order)
  items: CartItem[];

  @Column('json')
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  };

  @Column('json')
  delivery: {
    type: string,
    address: any,
  };

  @Column()
  comments: string;

  @Column()
  status: string;

  @Column('double precision')
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}