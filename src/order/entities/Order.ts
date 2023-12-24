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


// id - uuid
// user_id - uuid
// cart_id - uuid (Foreign key from carts.id)
// payment - JSON
// delivery - JSON
// comments - text
// status - ENUM or text
// total - number


@Entity("order")
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  //TODO make many to one relations here

  // @ManyToOne(() => Cart, cart => cart.order)
  // items: CartItem[];

  @ManyToOne(() => Cart, (cart) => cart.order)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;


  // @Column()
  // cartId: string;

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