import { MigrationInterface, QueryRunner } from 'typeorm';

export default class fieldJournalAddDateField1621722151964
    implements MigrationInterface {
    name = 'fieldJournalAddDateField1621722151964';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "FieldJournal" ADD "date" TIMESTAMP NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "FieldJournal" DROP COLUMN "date"`,
        );
    }
}
