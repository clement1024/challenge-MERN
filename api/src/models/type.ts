import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne } from 'typeorm';
import {Menu} from './menu';

@Entity()
export class Type {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column()
  typename: string;

  @OneToMany(() => Menu, menu => menu.type)
  menu: Promise<Array<Menu>>;

}