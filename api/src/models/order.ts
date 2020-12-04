import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { Menu } from './menu';

@Entity()
export class Order {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column()
  time: string;

  @Column()
  user_id: number;

  @Column()
  menu_id: number;

  @ManyToOne(() => User, user => user.order)
  user: Promise<User>;

  @ManyToOne(() => Menu, menu => menu.order)
  menu: Promise<Menu>;
}