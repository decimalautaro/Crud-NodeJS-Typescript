import { Column,OneToMany, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { PrestacionServicio } from "./PrestacionServicio";
import { Reclamo } from "./Reclamo";

@Entity("clientes")
class Cliente {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToMany(()=> Reclamo, reclamo => reclamo.cliente)
  reclamos: Reclamo[];

  @OneToMany(()=> PrestacionServicio, prestacionServicio => prestacionServicio.cliente)
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

export { Cliente };