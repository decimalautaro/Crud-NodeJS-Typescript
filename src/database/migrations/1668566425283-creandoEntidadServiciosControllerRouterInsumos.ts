import {MigrationInterface, QueryRunner} from "typeorm";

export class creandoEntidadServiciosControllerRouterInsumos1668566425283 implements MigrationInterface {
    name = 'creandoEntidadServiciosControllerRouterInsumos1668566425283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "insumos" ("id" varchar PRIMARY KEY NOT NULL, "tipo" varchar NOT NULL, "marca" varchar NOT NULL, "modelo" varchar NOT NULL, "descripcion" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "insumos"`);
    }

}
