import {MigrationInterface, QueryRunner} from "typeorm";

export class creandoEntidadServicios1668553408176 implements MigrationInterface {
    name = 'creandoEntidadServicios1668553408176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "servicios" ("id" varchar PRIMARY KEY NOT NULL, "precio" integer NOT NULL, "planes" varchar NOT NULL, "tipoServicio" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "servicios"`);
    }

}
