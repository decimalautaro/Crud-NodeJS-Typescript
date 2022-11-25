import { Column,OneToMany, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { PrestacionServicio } from "./PrestacionServicio";
import { Reclamo } from "./Reclamo";

@Entity("users")
class User {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  @Column()
  state: string;


  @OneToMany(()=> Reclamo, reclamo => reclamo.user)
  reclamos: Reclamo[];

  @OneToMany(()=> PrestacionServicio, prestacionServicio => prestacionServicio.user)
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

export { User };