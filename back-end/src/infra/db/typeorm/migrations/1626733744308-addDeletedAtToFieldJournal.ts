import { MigrationInterface, QueryRunner } from 'typeorm';

export default class addDeletedAtToFieldJournal1626733744308
    implements MigrationInterface {
    name = 'addDeletedAtToFieldJournal1626733744308';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "FieldJournal" ADD "deletedAt" TIMESTAMP`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "FieldJournal" DROP COLUMN "deletedAt"`,
        );
    }
}
