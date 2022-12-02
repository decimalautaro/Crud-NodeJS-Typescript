import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cliente } from "./Cliente";
import { Insumo } from "./Insumo";
import { Servicio } from "./Servicio";
import { Tecnico } from "./Tecnico";
import { User } from "./User";

@Entity("prestacionServicio")

class PrestacionServicio {

    @PrimaryColumn()
    id: string

    @Column()
    clienteId: string
    
    @Column()
    tecnicoId: string
    
    @Column()
    servicioId: string

    @Column()
    insumoId: string

    @ManyToOne(()=> Cliente, cliente => cliente.prestacionServicios)
    @JoinColumn({name: "clienteId"})
    cliente: Cliente

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