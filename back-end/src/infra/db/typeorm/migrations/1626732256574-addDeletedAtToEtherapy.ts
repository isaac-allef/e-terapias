import { MigrationInterface, QueryRunner } from 'typeorm';

export default class addDeletedAtToEtherapy1626732256574
    implements MigrationInterface {
    name = 'addDeletedAtToEtherapy1626732256574';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Etherapy" ADD "deletedAt" TIMESTAMP`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Etherapy" DROP COLUMN "deletedAt"`,
        );
    }
}
