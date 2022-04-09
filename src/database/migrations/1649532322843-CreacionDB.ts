import {MigrationInterface, QueryRunner} from "typeorm";

export class CreacionDB1649532322843 implements MigrationInterface {
    name = 'CreacionDB1649532322843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "nameProduct" varchar NOT NULL, "price" integer NOT NULL, "type" varchar NOT NULL, "categoryId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "phone" varchar NOT NULL, "city" varchar NOT NULL, "state" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "nameProduct" varchar NOT NULL, "price" integer NOT NULL, "type" varchar NOT NULL, "categoryId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "nameProduct", "price", "type", "categoryId", "created_at", "updated_at") SELECT "id", "nameProduct", "price", "type", "categoryId", "created_at", "updated_at" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "nameProduct" varchar NOT NULL, "price" integer NOT NULL, "type" varchar NOT NULL, "categoryId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "products"("id", "nameProduct", "price", "type", "categoryId", "created_at", "updated_at") SELECT "id", "nameProduct", "price", "type", "categoryId", "created_at", "updated_at" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
