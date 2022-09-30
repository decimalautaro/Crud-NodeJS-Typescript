import { Column, CreateDateColumn, Double, Entity, PrimaryColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";

@Entity("tecnicos")
class Tecnico {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  puesto: string;

  @Column()
  telefono: number;

  @Column()
  email: string;
  

//   @OneToMany(() => Product, product => product.category, {eager:true})
//   products: Product[];

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

export { Tecnico };