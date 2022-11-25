import {MigrationInterface, QueryRunner} from "typeorm";

export class prestacionServicio1669335378702 implements MigrationInterface {
    name = 'prestacionServicio1669335378702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prestacionServicio" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar NOT NULL, "tecnicoId" varchar NOT NULL, "servicioId" varchar NOT NULL, "insumoId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_prestacionServicio" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar NOT NULL, "tecnicoId" varchar NOT NULL, "servicioId" varchar NOT NULL, "insumoId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_1ee88aa5f50879cf006651011bc" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c7685731e63b58a1aa256b89e8b" FOREIGN KEY ("tecnicoId") REFERENCES "tecnicos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3c5ba1eee5e8a371b2630a6738f" FOREIGN KEY ("servicioId") REFERENCES "servicios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9b3df4683625097a4dc55a32a48" FOREIGN KEY ("insumoId") REFERENCES "insumos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_prestacionServicio"("id", "userId", "tecnicoId", "servicioId", "insumoId", "created_at", "updated_at") SELECT "id", "userId", "tecnicoId", "servicioId", "insumoId", "created_at", "updated_at" FROM "prestacionServicio"`);
        await queryRunner.query(`DROP TABLE "prestacionServicio"`);
        await queryRunner.query(`ALTER TABLE "temporary_prestacionServicio" RENAME TO "prestacionServicio"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prestacionServicio" RENAME TO "temporary_prestacionServicio"`);
        await queryRunner.query(`CREATE TABLE "prestacionServicio" ("id" varchar PRIMARY KEY NOT NULL, "userId" varchar NOT NULL, "tecnicoId" varchar NOT NULL, "servicioId" varchar NOT NULL, "insumoId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "prestacionServicio"("id", "userId", "tecnicoId", "servicioId", "insumoId", "created_at", "updated_at") SELECT "id", "userId", "tecnicoId", "servicioId", "insumoId", "created_at", "updated_at" FROM "temporary_prestacionServicio"`);
        await queryRunner.query(`DROP TABLE "temporary_prestacionServicio"`);
        await queryRunner.query(`DROP TABLE "prestacionServicio"`);
    }

}
