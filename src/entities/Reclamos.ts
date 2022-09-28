import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
import { User } from "./User";
@Entity("reclamos")
class Reclamos {

  @PrimaryColumn()
  id: string;

  @Column()
  tipoReclamo: string;

  @Column()
  numeroReclamo: number;

  @Column()
  fecha: Date;

  @Column()
  estado: boolean;


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

export { Reclamos };