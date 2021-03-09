import { MigrationInterface, QueryRunner } from 'typeorm';

export default class onDeleteInFieldJournalToModeratorAndEterapia1615325897198
    implements MigrationInterface {
    name = 'onDeleteInFieldJournalToModeratorAndEterapia1615325897198';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "field_journal" DROP CONSTRAINT "FK_cddf3598ab1afa902d4beb8c702"`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal" DROP CONSTRAINT "FK_9fc8c50311b31f820fd67c58ff0"`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal" ADD CONSTRAINT "FK_cddf3598ab1afa902d4beb8c702" FOREIGN KEY ("moderatorId") REFERENCES "moderator"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal" ADD CONSTRAINT "FK_9fc8c50311b31f820fd67c58ff0" FOREIGN KEY ("eterapiaId") REFERENCES "eterapia"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "field_journal" DROP CONSTRAINT "FK_9fc8c50311b31f820fd67c58ff0"`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal" DROP CONSTRAINT "FK_cddf3598ab1afa902d4beb8c702"`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal" ADD CONSTRAINT "FK_9fc8c50311b31f820fd67c58ff0" FOREIGN KEY ("eterapiaId") REFERENCES "eterapia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal" ADD CONSTRAINT "FK_cddf3598ab1afa902d4beb8c702" FOREIGN KEY ("moderatorId") REFERENCES "moderator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
