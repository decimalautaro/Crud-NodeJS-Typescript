import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { PrestacionServicio } from "./PrestacionServicio";
@Entity("insumos")
class Insumo {

  @PrimaryColumn()
  id: string;

  @Column()
  tipo: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;


  @Column()
  descripcion: string;

  @Column()
  insumoId:string;

  @ManyToOne(()=> PrestacionServicio, prestacionServicio => prestacionServicio.insumo)
  @JoinColumn({name: "insumoId"})
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

export { Insumo };