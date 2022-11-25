import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Insumo } from "./Insumo";
import { Servicio } from "./Servicio";
import { Tecnico } from "./Tecnico";
import { User } from "./User";

@Entity("prestacionServicio")

class PrestacionServicio {

    @PrimaryColumn()
    id: string

    @Column()
    userId: string
    
    @Column()
    tecnicoId: string
    
    @Column()
    servicioId: string

    @Column()
    insumoId: string

    @ManyToOne(()=> User, user => user.prestacionServicios)
    @JoinColumn({name: "userId"})
    user: User

    @ManyToOne(()=> Tecnico, tecnico => tecnico.prestacionServicios)
    @JoinColumn({name: "tecnicoId"})
    tecnico: Tecnico
    
    @ManyToOne(()=> Servicio, servicio => servicio.prestacionServicios)
    @JoinColumn({name: "servicioId"})
    servicio: Servicio
    
    @ManyToOne(()=> Insumo, insumo => insumo.prestacionServicios)
    @JoinColumn({name: "insumoId"})
    insumo: Insumo

    @Column()
    tipoPrestacion: string;

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

export { PrestacionServicio }