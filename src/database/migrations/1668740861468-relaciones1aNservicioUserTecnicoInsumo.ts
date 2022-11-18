import {MigrationInterface, QueryRunner} from "typeorm";

export class relaciones1aNservicioUserTecnicoInsumo1668740861468 implements MigrationInterface {
    name = 'relaciones1aNservicioUserTecnicoInsumo1668740861468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prestacionServicios" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_servicios" ("id" varchar PRIMARY KEY NOT NULL, "precio" integer NOT NULL, "planes" varchar NOT NULL, "tipoServicio" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "servicioId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_servicios"("id", "precio", "planes", "tipoServicio", "created_at", "updated_at") SELECT "id", "precio", "planes", "tipoServicio", "created_at", "updated_at" FROM "servicios"`);
        await queryRunner.query(`DROP TABLE "servicios"`);
        await queryRunner.query(`ALTER TABLE "temporary_servicios" RENAME TO "servicios"`);
        await queryRunner.query(`CREATE TABLE "temporary_tecnicos" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "puesto" varchar NOT NULL, "telefono" integer NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "disponibilidad" varchar NOT NULL, "tecnicoId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_tecnicos"("id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at", "disponibilidad") SELECT "id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at", "disponibilidad" FROM "tecnicos"`);
        await queryRunner.query(`DROP TABLE "tecnicos"`);
        await queryRunner.query(`ALTER TABLE "temporary_tecnicos" RENAME TO "tecnicos"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "username", "password", "email", "phone", "city", "state", "created_at", "updated_at") SELECT "id", "name", "username", "password", "email", "phone", "city", "state", "created_at", "updated_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_insumos" ("id" varchar PRIMARY KEY NOT NULL, "tipo" varchar NOT NULL, "marca" varchar NOT NULL, "modelo" varchar NOT NULL, "descripcion" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "insumoId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_insumos"("id", "tipo", "marca", "modelo", "descripcion", "created_at", "updated_at") SELECT "id", "tipo", "marca", "modelo", "descripcion", "created_at", "updated_at" FROM "insumos"`);
        await queryRunner.query(`DROP TABLE "insumos"`);
        await queryRunner.query(`ALTER TABLE "temporary_insumos" RENAME TO "insumos"`);
        await queryRunner.query(`CREATE TABLE "temporary_servicios" ("id" varchar PRIMARY KEY NOT NULL, "precio" integer NOT NULL, "planes" varchar NOT NULL, "tipoServicio" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "servicioId" varchar NOT NULL, CONSTRAINT "FK_8f503c06d2c3d7d1bddc9cd0679" FOREIGN KEY ("servicioId") REFERENCES "prestacionServicios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_servicios"("id", "precio", "planes", "tipoServicio", "created_at", "updated_at", "servicioId") SELECT "id", "precio", "planes", "tipoServicio", "created_at", "updated_at", "servicioId" FROM "servicios"`);
        await queryRunner.query(`DROP TABLE "servicios"`);
        await queryRunner.query(`ALTER TABLE "temporary_servicios" RENAME TO "servicios"`);
        await queryRunner.query(`CREATE TABLE "temporary_tecnicos" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "puesto" varchar NOT NULL, "telefono" integer NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "disponibilidad" varchar NOT NULL, "tecnicoId" varchar NOT NULL, CONSTRAINT "FK_13221c1e6fa1450e5c5480d7219" FOREIGN KEY ("tecnicoId") REFERENCES "prestacionServicios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tecnicos"("id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at", "disponibilidad", "tecnicoId") SELECT "id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at", "disponibilidad", "tecnicoId" FROM "tecnicos"`);
        await queryRunner.query(`DROP TABLE "tecnicos"`);
        await queryRunner.query(`ALTER TABLE "temporary_tecnicos" RENAME TO "tecnicos"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar NOT NULL, CONSTRAINT "FK_8bf09ba754322ab9c22a215c919" FOREIGN KEY ("userId") REFERENCES "prestacionServicios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "username", "password", "email", "phone", "city", "state", "created_at", "updated_at", "userId") SELECT "id", "name", "username", "password", "email", "phone", "city", "state", "created_at", "updated_at", "userId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_insumos" ("id" varchar PRIMARY KEY NOT NULL, "tipo" varchar NOT NULL, "marca" varchar NOT NULL, "modelo" varchar NOT NULL, "descripcion" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "insumoId" varchar NOT NULL, CONSTRAINT "FK_38c4e6a8e2de97345019b7e45e5" FOREIGN KEY ("insumoId") REFERENCES "prestacionServicios" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_insumos"("id", "tipo", "marca", "modelo", "descripcion", "created_at", "updated_at", "insumoId") SELECT "id", "tipo", "marca", "modelo", "descripcion", "created_at", "updated_at", "insumoId" FROM "insumos"`);
        await queryRunner.query(`DROP TABLE "insumos"`);
        await queryRunner.query(`ALTER TABLE "temporary_insumos" RENAME TO "insumos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "insumos" RENAME TO "temporary_insumos"`);
        await queryRunner.query(`CREATE TABLE "insumos" ("id" varchar PRIMARY KEY NOT NULL, "tipo" varchar NOT NULL, "marca" varchar NOT NULL, "modelo" varchar NOT NULL, "descripcion" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "insumoId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "insumos"("id", "tipo", "marca", "modelo", "descripcion", "created_at", "updated_at", "insumoId") SELECT "id", "tipo", "marca", "modelo", "descripcion", "created_at", "updated_at", "insumoId" FROM "temporary_insumos"`);
        await queryRunner.query(`DROP TABLE "temporary_insumos"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "username", "password", "email", "phone", "city", "state", "created_at", "updated_at", "userId") SELECT "id", "name", "username", "password", "email", "phone", "city", "state", "created_at", "updated_at", "userId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "tecnicos" RENAME TO "temporary_tecnicos"`);
        await queryRunner.query(`CREATE TABLE "tecnicos" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "puesto" varchar NOT NULL, "telefono" integer NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "disponibilidad" varchar NOT NULL, "tecnicoId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "tecnicos"("id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at", "disponibilidad", "tecnicoId") SELECT "id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at", "disponibilidad", "tecnicoId" FROM "temporary_tecnicos"`);
        await queryRunner.query(`DROP TABLE "temporary_tecnicos"`);
        await queryRunner.query(`ALTER TABLE "servicios" RENAME TO "temporary_servicios"`);
        await queryRunner.query(`CREATE TABLE "servicios" ("id" varchar PRIMARY KEY NOT NULL, "precio" integer NOT NULL, "planes" varchar NOT NULL, "tipoServicio" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "servicioId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "servicios"("id", "precio", "planes", "tipoServicio", "created_at", "updated_at", "servicioId") SELECT "id", "precio", "planes", "tipoServicio", "created_at", "updated_at", "servicioId" FROM "temporary_servicios"`);
        await queryRunner.query(`DROP TABLE "temporary_servicios"`);
        await queryRunner.query(`ALTER TABLE "insumos" RENAME TO "temporary_insumos"`);
        await queryRunner.query(`CREATE TABLE "insumos" ("id" varchar PRIMARY KEY NOT NULL, "tipo" varchar NOT NULL, "marca" varchar NOT NULL, "modelo" varchar NOT NULL, "descripcion" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "insumos"("id", "tipo", "marca", "modelo", "descripcion", "created_at", "updated_at") SELECT "id", "tipo", "marca", "modelo", "descripcion", "created_at", "updated_at" FROM "temporary_insumos"`);
        await queryRunner.query(`DROP TABLE "temporary_insumos"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "username", "password", "email", "phone", "city", "state", "created_at", "updated_at") SELECT "id", "name", "username", "password", "email", "phone", "city", "state", "created_at", "updated_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "tecnicos" RENAME TO "temporary_tecnicos"`);
        await queryRunner.query(`CREATE TABLE "tecnicos" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "puesto" varchar NOT NULL, "telefono" integer NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "disponibilidad" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "tecnicos"("id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at", "disponibilidad") SELECT "id", "nombre", "puesto", "telefono", "email", "created_at", "updated_at", "disponibilidad" FROM "temporary_tecnicos"`);
        await queryRunner.query(`DROP TABLE "temporary_tecnicos"`);
        await queryRunner.query(`ALTER TABLE "servicios" RENAME TO "temporary_servicios"`);
        await queryRunner.query(`CREATE TABLE "servicios" ("id" varchar PRIMARY KEY NOT NULL, "precio" integer NOT NULL, "planes" varchar NOT NULL, "tipoServicio" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "servicios"("id", "precio", "planes", "tipoServicio", "created_at", "updated_at") SELECT "id", "precio", "planes", "tipoServicio", "created_at", "updated_at" FROM "temporary_servicios"`);
        await queryRunner.query(`DROP TABLE "temporary_servicios"`);
        await queryRunner.query(`DROP TABLE "prestacionServicios"`);
    }

}
