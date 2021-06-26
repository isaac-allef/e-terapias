import { MigrationInterface, QueryRunner } from 'typeorm';

export default class createOfferEntity1624740262514
    implements MigrationInterface {
    name = 'createOfferEntity1624740262514';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Offer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, "settings" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_062e916fbccb00ebbcb08ca2f83" UNIQUE ("name"), CONSTRAINT "PK_0ef6b03361b2e15ea4c60e1e536" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Offer"`);
    }
}
