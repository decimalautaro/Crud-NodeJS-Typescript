import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
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
  userId:string;

  @ManyToOne(()=> User, user => user.reclamos)
  @JoinColumn({name: "userId"})
  user: User

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