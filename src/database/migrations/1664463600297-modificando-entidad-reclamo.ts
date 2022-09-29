import {MigrationInterface, QueryRunner} from "typeorm";

export class modificandoEntidadReclamo1664463600297 implements MigrationInterface {
    name = 'modificandoEntidadReclamo1664463600297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" varchar NOT NULL DEFAULT ('i4IkYc3AY'), "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at" FROM "reclamos"`);
        await queryRunner.query(`DROP TABLE "reclamos"`);
        await queryRunner.query(`ALTER TABLE "temporary_reclamos" RENAME TO "reclamos"`);
        await queryRunner.query(`CREATE TABLE "temporary_reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" integer NOT NULL, "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at" FROM "reclamos"`);
        await queryRunner.query(`DROP TABLE "reclamos"`);
        await queryRunner.query(`ALTER TABLE "temporary_reclamos" RENAME TO "reclamos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reclamos" RENAME TO "temporary_reclamos"`);
        await queryRunner.query(`CREATE TABLE "reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" varchar NOT NULL DEFAULT ('i4IkYc3AY'), "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at" FROM "temporary_reclamos"`);
        await queryRunner.query(`DROP TABLE "temporary_reclamos"`);
        await queryRunner.query(`ALTER TABLE "reclamos" RENAME TO "temporary_reclamos"`);
        await queryRunner.query(`CREATE TABLE "reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" varchar NOT NULL DEFAULT ('i4IkYc3AY'), "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at" FROM "temporary_reclamos"`);
        await queryRunner.query(`DROP TABLE "temporary_reclamos"`);
    }

}
