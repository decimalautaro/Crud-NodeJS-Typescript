import {MigrationInterface, QueryRunner} from "typeorm";

export class agregandoCampoTecnico1664577810689 implements MigrationInterface {
    name = 'agregandoCampoTecnico1664577810689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_tecnicos" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "puesto" varchar NOT NULL, "telefono" integer NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "disponibilidad" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_tecnicos"("id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at") SELECT "id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at" FROM "tecnicos"`);
        await queryRunner.query(`DROP TABLE "tecnicos"`);
        await queryRunner.query(`ALTER TABLE "temporary_tecnicos" RENAME TO "tecnicos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tecnicos" RENAME TO "temporary_tecnicos"`);
        await queryRunner.query(`CREATE TABLE "tecnicos" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "puesto" varchar NOT NULL, "telefono" integer NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "tecnicos"("id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at") SELECT "id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at" FROM "temporary_tecnicos"`);
        await queryRunner.query(`DROP TABLE "temporary_tecnicos"`);
    }

}
