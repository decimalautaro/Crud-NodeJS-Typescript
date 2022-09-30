import { Column, CreateDateColumn, Double, Entity, PrimaryColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Reclamo } from "./Reclamo";

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
  
  @OneToMany(()=> Reclamo, reclamo => reclamo.tecnico)
  reclamos: Reclamo[];

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