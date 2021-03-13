import { MigrationInterface, QueryRunner } from 'typeorm';

export default class onDeleteInFieldToFieldJournal1615320613633
    implements MigrationInterface {
    name = 'onDeleteInFieldToFieldJournal1615320613633';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "field" DROP CONSTRAINT "FK_eba04e9f5ff1c40dfca4b8d0190"`,
        );
        await queryRunner.query(
            `ALTER TABLE "field" ADD CONSTRAINT "FK_eba04e9f5ff1c40dfca4b8d0190" FOREIGN KEY ("fieldJournalId") REFERENCES "field_journal"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "field" DROP CONSTRAINT "FK_eba04e9f5ff1c40dfca4b8d0190"`,
        );
        await queryRunner.query(
            `ALTER TABLE "field" ADD CONSTRAINT "FK_eba04e9f5ff1c40dfca4b8d0190" FOREIGN KEY ("fieldJournalId") REFERENCES "field_journal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
