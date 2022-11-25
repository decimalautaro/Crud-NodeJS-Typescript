import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { PrestacionServicio } from "./PrestacionServicio";

@Entity("servicios")
class Servicio {

  @PrimaryColumn()
  id: string;

  @Column()
  precio: number;

  @Column()
  planes: string;

  @Column()
  tipoServicio: string;

  @OneToMany(()=> PrestacionServicio, prestacionServicio => prestacionServicio.servicio)
  prestacionServicios: PrestacionServicio[];

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

export { Servicio };

