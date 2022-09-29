import {MigrationInterface, QueryRunner} from "typeorm";

export class agregandoLibreriaShorIDcorregidaF1664431594489 implements MigrationInterface {
    name = 'agregandoLibreriaShorIDcorregidaF1664431594489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" varchar NOT NULL DEFAULT ('i4IkYc3AY'), "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at" FROM "reclamos"`);
        await queryRunner.query(`DROP TABLE "reclamos"`);
        await queryRunner.query(`ALTER TABLE "temporary_reclamos" RENAME TO "reclamos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reclamos" RENAME TO "temporary_reclamos"`);
        await queryRunner.query(`CREATE TABLE "reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" varchar NOT NULL DEFAULT ('ylZM7VHLvOFcohp01x-fXNr8P_tqin6RkgWGm4SIDdK5s2TAJebzQEBUwuY9j3aC'), "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at" FROM "temporary_reclamos"`);
        await queryRunner.query(`DROP TABLE "temporary_reclamos"`);
    }

}
