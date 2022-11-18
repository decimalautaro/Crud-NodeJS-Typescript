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

  @Column()
  userId: string;

  @OneToMany(()=> Reclamo, reclamo => reclamo.user)
  reclamos: Reclamo[];

  @ManyToOne(()=> PrestacionServicio, prestacionServicio => prestacionServicio.user)
  @JoinColumn({name: "userId"})
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

export { User };