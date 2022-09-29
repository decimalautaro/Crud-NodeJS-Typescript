import {MigrationInterface, QueryRunner} from "typeorm";

export class dbConReclamos1664411962003 implements MigrationInterface {
    name = 'dbConReclamos1664411962003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" integer NOT NULL, "fecha" datetime NOT NULL, "estado" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reclamos"`);
    }

}
