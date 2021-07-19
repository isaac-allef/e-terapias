import { MigrationInterface, QueryRunner } from 'typeorm';

export default class addDeletedAtToOffer1626734218119
    implements MigrationInterface {
    name = 'addDeletedAtToOffer1626734218119';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Offer" ADD "deletedAt" TIMESTAMP`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Offer" DROP COLUMN "deletedAt"`);
    }
}
