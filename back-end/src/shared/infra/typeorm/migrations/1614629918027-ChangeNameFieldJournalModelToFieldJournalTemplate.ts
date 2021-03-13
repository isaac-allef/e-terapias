import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeNameFieldJournalModelToFieldJournalTemplate1614629918027
    implements MigrationInterface {
    name = 'ChangeNameFieldJournalModelToFieldJournalTemplate1614629918027';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "eterapia" DROP CONSTRAINT "FK_acad9a6e817f5156e6696eeb4c8"`,
        );
        await queryRunner.query(
            `ALTER TABLE "eterapia" RENAME COLUMN "fieldJournalModelId" TO "fieldJournalTemplateId"`,
        );
        await queryRunner.query(
            `CREATE TABLE "field_journal_template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_75ea9069b8afbee6ccce364c48e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "eterapia" ADD CONSTRAINT "FK_dd4bca98f91e24ad057b1e48355" FOREIGN KEY ("fieldJournalTemplateId") REFERENCES "field_journal_template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "eterapia" DROP CONSTRAINT "FK_dd4bca98f91e24ad057b1e48355"`,
        );
        await queryRunner.query(`DROP TABLE "field_journal_template"`);
        await queryRunner.query(
            `ALTER TABLE "eterapia" RENAME COLUMN "fieldJournalTemplateId" TO "fieldJournalModelId"`,
        );
        await queryRunner.query(
            `ALTER TABLE "eterapia" ADD CONSTRAINT "FK_acad9a6e817f5156e6696eeb4c8" FOREIGN KEY ("fieldJournalModelId") REFERENCES "field_journal_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
