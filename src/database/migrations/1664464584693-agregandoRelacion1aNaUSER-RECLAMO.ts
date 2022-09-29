import {MigrationInterface, QueryRunner} from "typeorm";

export class agregandoRelacion1aNaUSERRECLAMO1664464584693 implements MigrationInterface {
    name = 'agregandoRelacion1aNaUSERRECLAMO1664464584693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" integer NOT NULL, "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at" FROM "reclamos"`);
        await queryRunner.query(`DROP TABLE "reclamos"`);
        await queryRunner.query(`ALTER TABLE "temporary_reclamos" RENAME TO "reclamos"`);
        await queryRunner.query(`CREATE TABLE "temporary_reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" integer NOT NULL, "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar NOT NULL, CONSTRAINT "FK_0826853828ae84870a05f1a801d" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at", "userId") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at", "userId" FROM "reclamos"`);
        await queryRunner.query(`DROP TABLE "reclamos"`);
        await queryRunner.query(`ALTER TABLE "temporary_reclamos" RENAME TO "reclamos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reclamos" RENAME TO "temporary_reclamos"`);
        await queryRunner.query(`CREATE TABLE "reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" integer NOT NULL, "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at", "userId") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at", "userId" FROM "temporary_reclamos"`);
        await queryRunner.query(`DROP TABLE "temporary_reclamos"`);
        await queryRunner.query(`ALTER TABLE "reclamos" RENAME TO "temporary_reclamos"`);
        await queryRunner.query(`CREATE TABLE "reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" integer NOT NULL, "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "created_at", "updated_at" FROM "temporary_reclamos"`);
        await queryRunner.query(`DROP TABLE "temporary_reclamos"`);
    }

}
