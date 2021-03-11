import { MigrationInterface, QueryRunner } from 'typeorm';

export default class onDeleteSetNullInEterapiaToFieldJournalTemplate1615423043642
    implements MigrationInterface {
    name = 'onDeleteSetNullInEterapiaToFieldJournalTemplate1615423043642';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "eterapia" DROP CONSTRAINT "FK_dd4bca98f91e24ad057b1e48355"`,
        );
        await queryRunner.query(
            `ALTER TABLE "eterapia" ADD CONSTRAINT "FK_dd4bca98f91e24ad057b1e48355" FOREIGN KEY ("fieldJournalTemplateId") REFERENCES "field_journal_template"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "eterapia" DROP CONSTRAINT "FK_dd4bca98f91e24ad057b1e48355"`,
        );
        await queryRunner.query(
            `ALTER TABLE "eterapia" ADD CONSTRAINT "FK_dd4bca98f91e24ad057b1e48355" FOREIGN KEY ("fieldJournalTemplateId") REFERENCES "field_journal_template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
