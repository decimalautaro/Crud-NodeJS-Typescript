import { Column, CreateDateColumn, Double, Entity, PrimaryColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";

@Entity("categories")
class Category {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Product, product => product.category)
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

export { Category };