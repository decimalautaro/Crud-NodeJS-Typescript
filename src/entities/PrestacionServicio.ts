import { Column,OneToMany, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Insumo } from "./Insumo";
import { Servicio } from "./Servicio";
import { Tecnico } from "./Tecnico";
import { User } from "./User";

@Entity("prestacionServicios")
class PrestacionServicio {

  @PrimaryColumn()
  id: string;

 

  @OneToMany(()=> Servicio, servicio => servicio.prestacionServicio)
  servicio: Servicio[];

  @OneToMany(()=> Insumo, insumo => insumo.prestacionServicio)
  insumo: Insumo[];

  @OneToMany(()=> Insumo, tecnico => tecnico.prestacionServicio)
  tecnico: Tecnico[];

  @OneToMany(()=> User, user => user.prestacionServicio)
  user: User[];


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

export { PrestacionServicio };