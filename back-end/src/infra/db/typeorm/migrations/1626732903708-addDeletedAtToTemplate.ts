import { MigrationInterface, QueryRunner } from 'typeorm';

export default class addDeletedAtToTemplate1626732903708
    implements MigrationInterface {
    name = 'addDeletedAtToTemplate1626732903708';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Template" ADD "deletedAt" TIMESTAMP`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Template" DROP COLUMN "deletedAt"`,
        );
    }
}
