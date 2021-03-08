import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeDescriptionFieldTypeToJsonb1614461262080
    implements MigrationInterface {
    name = 'ChangeDescriptionFieldTypeToJsonb1614461262080';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "field_journal_model" DROP COLUMN "description"`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal_model" ADD "description" jsonb NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "field_journal_model" DROP COLUMN "description"`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal_model" ADD "description" character varying NOT NULL`,
        );
    }
}
