import {MigrationInterface, QueryRunner} from "typeorm";

export class dbCompletaMasTecnico1664550870224 implements MigrationInterface {
    name = 'dbCompletaMasTecnico1664550870224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tecnicos" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "puesto" varchar NOT NULL, "telefono" integer NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tecnicos"`);
    }

}
