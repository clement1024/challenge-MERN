import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import {Order} from './order';

@Entity()
export class User {
  @PrimaryColumn({generated: 'increment'})
  id: number;

  @Column()
  name: string;

  @Column()
  price: number = 0;

  @OneToMany(() => Order, order => order.user)
  order: Promise<Array<Order>>;
}