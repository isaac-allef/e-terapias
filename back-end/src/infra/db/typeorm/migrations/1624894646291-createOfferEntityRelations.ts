import { MigrationInterface, QueryRunner } from 'typeorm';

export default class createOfferEntityRelations1624894646291
    implements MigrationInterface {
    name = 'createOfferEntityRelations1624894646291';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "offer_managers__manager" ("offerId" uuid NOT NULL, "managerId" uuid NOT NULL, CONSTRAINT "PK_b375c56f7b06f08ce995faee266" PRIMARY KEY ("offerId", "managerId"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_406d5d750d939f2c1aafe920ee" ON "offer_managers__manager" ("offerId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_5f30c4ea8d4ce27f68848e3b69" ON "offer_managers__manager" ("managerId") `,
        );
        await queryRunner.query(`ALTER TABLE "Etherapy" ADD "offerId" uuid`);
        await queryRunner.query(
            `ALTER TABLE "Etherapy" ADD CONSTRAINT "FK_459a37d701ed458d8cd357a0c69" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "offer_managers__manager" ADD CONSTRAINT "FK_406d5d750d939f2c1aafe920ee2" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "offer_managers__manager" ADD CONSTRAINT "FK_5f30c4ea8d4ce27f68848e3b69b" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "offer_managers__manager" DROP CONSTRAINT "FK_5f30c4ea8d4ce27f68848e3b69b"`,
        );
        await queryRunner.query(
            `ALTER TABLE "offer_managers__manager" DROP CONSTRAINT "FK_406d5d750d939f2c1aafe920ee2"`,
        );
        await queryRunner.query(
            `ALTER TABLE "Etherapy" DROP CONSTRAINT "FK_459a37d701ed458d8cd357a0c69"`,
        );
        await queryRunner.query(`ALTER TABLE "Etherapy" DROP COLUMN "offerId"`);
        await queryRunner.query(`DROP INDEX "IDX_5f30c4ea8d4ce27f68848e3b69"`);
        await queryRunner.query(`DROP INDEX "IDX_406d5d750d939f2c1aafe920ee"`);
        await queryRunner.query(`DROP TABLE "offer_managers__manager"`);
    }
}
