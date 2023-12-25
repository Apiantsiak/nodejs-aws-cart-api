import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("product")
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("double precision")
  price: number;
}
