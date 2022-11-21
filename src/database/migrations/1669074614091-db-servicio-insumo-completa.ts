import {MigrationInterface, QueryRunner} from "typeorm";

export class dbServicioInsumoCompleta1669074614091 implements MigrationInterface {
    name = 'dbServicioInsumoCompleta1669074614091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "nameProduct" varchar NOT NULL, "price" integer NOT NULL, "type" varchar NOT NULL, "categoryId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "insumos" ("id" varchar PRIMARY KEY NOT NULL, "tipo" varchar NOT NULL, "marca" varchar NOT NULL, "modelo" varchar NOT NULL, "descripcion" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "tecnicos" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "puesto" varchar NOT NULL, "telefono" integer NOT NULL, "email" varchar NOT NULL, "disponibilidad" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" integer NOT NULL, "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "userId" varchar NOT NULL, "tecnicoId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "servicios" ("id" varchar PRIMARY KEY NOT NULL, "precio" integer NOT NULL, "planes" varchar NOT NULL, "tipoServicio" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "nameProduct" varchar NOT NULL, "price" integer NOT NULL, "type" varchar NOT NULL, "categoryId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "nameProduct", "price", "type", "categoryId", "created_at", "updated_at") SELECT "id", "nameProduct", "price", "type", "categoryId", "created_at", "updated_at" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
        await queryRunner.query(`CREATE TABLE "temporary_reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" integer NOT NULL, "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "userId" varchar NOT NULL, "tecnicoId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_0826853828ae84870a05f1a801d" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_18fed8d155580d244083869d4d6" FOREIGN KEY ("tecnicoId") REFERENCES "tecnicos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "userId", "tecnicoId", "created_at", "updated_at") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "userId", "tecnicoId", "created_at", "updated_at" FROM "reclamos"`);
        await queryRunner.query(`DROP TABLE "reclamos"`);
        await queryRunner.query(`ALTER TABLE "temporary_reclamos" RENAME TO "reclamos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reclamos" RENAME TO "temporary_reclamos"`);
        await queryRunner.query(`CREATE TABLE "reclamos" ("id" varchar PRIMARY KEY NOT NULL, "tipoReclamo" varchar NOT NULL, "numeroReclamo" integer NOT NULL, "fecha" datetime NOT NULL, "estado" varchar NOT NULL, "userId" varchar NOT NULL, "tecnicoId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "reclamos"("id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "userId", "tecnicoId", "created_at", "updated_at") SELECT "id", "tipoReclamo", "numeroReclamo", "fecha", "estado", "userId", "tecnicoId", "created_at", "updated_at" FROM "temporary_reclamos"`);
        await queryRunner.query(`DROP TABLE "temporary_reclamos"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "nameProduct" varchar NOT NULL, "price" integer NOT NULL, "type" varchar NOT NULL, "categoryId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "products"("id", "nameProduct", "price", "type", "categoryId", "created_at", "updated_at") SELECT "id", "nameProduct", "price", "type", "categoryId", "created_at", "updated_at" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`DROP TABLE "servicios"`);
        await queryRunner.query(`DROP TABLE "reclamos"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tecnicos"`);
        await queryRunner.query(`DROP TABLE "insumos"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
