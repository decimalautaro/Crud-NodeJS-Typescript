import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cliente } from "./Cliente";
import { Tecnico } from "./Tecnico";
import { User } from "./User";

@Entity("reclamos")
class Reclamo {

  @PrimaryColumn()
  id: string;

  @Column()
  tipoReclamo: string;

  @Column()
  numeroReclamo: number;

  @Column()
  fecha: Date;

  @Column()
  estado: string;

  @Column()
  clienteId:string;

  @ManyToOne(()=> Cliente, cliente => cliente.reclamos)
  @JoinColumn({name: "clienteId"})
  cliente: Cliente

  @Column()
  tecnicoId: string;

  @ManyToOne(()=> Tecnico, tecnico => tecnico.reclamos)
  @JoinColumn({name: "tecnicoId"})
  tecnico: Tecnico


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

export { Reclamo };