import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
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

  @Column()
  servicioId:string;

  @ManyToOne(()=> PrestacionServicio, prestacionServicio => prestacionServicio.servicio)
  @JoinColumn({name: "servicioId"})
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

export { Servicio };

