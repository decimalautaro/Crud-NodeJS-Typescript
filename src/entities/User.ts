import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";

@Entity("users")
class User {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToMany(() => User, user => user.products, {eager:true})
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { User };