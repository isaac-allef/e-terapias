import { MigrationInterface, QueryRunner } from 'typeorm';

export default class createManager1620934072628 implements MigrationInterface {
    name = 'createManager1620934072628';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Manager" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "token" character varying, "role" character varying, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_15244601bb84446e9d64c5173a2" UNIQUE ("email"), CONSTRAINT "PK_aa85ff255e2dff1edcae191b64b" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Manager"`);
    }
}
