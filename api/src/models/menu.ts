import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne } from 'typeorm';
import {Type} from './type';
import {Order} from './order';

@Entity()
export class Menu {
  @PrimaryColumn({ generated: 'increment' })
  id: number ;

  @Column({ length: 35 })
  name: string ;

  @Column()
  price: number;

  @Column()
  pretime: number;

  @ManyToOne(() => Type, type => type.menu)
  type: Promise<Type> ;

  @OneToMany(() => Order, order => order.menu)
  order: Promise<Array<Order>> ;
}