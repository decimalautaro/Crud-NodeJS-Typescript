import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";

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

