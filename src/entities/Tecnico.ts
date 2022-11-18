import { Column, CreateDateColumn, Double, Entity, PrimaryColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { PrestacionServicio } from "./PrestacionServicio";
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

  @Column()
  disponibilidad: string;
  
  @OneToMany(()=> Reclamo, reclamo => reclamo.tecnico)
  reclamos: Reclamo[];

  @Column()
  tecnicoId:string;

  @ManyToOne(()=> PrestacionServicio, prestacionServicio => prestacionServicio.tecnico)
  @JoinColumn({name: "tecnicoId"})
  prestacionServicio: PrestacionServicio

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