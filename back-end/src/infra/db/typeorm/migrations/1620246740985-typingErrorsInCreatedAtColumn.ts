import { MigrationInterface, QueryRunner } from 'typeorm';

export default class typingErrorsInCreatedAtColumn1620246740985
    implements MigrationInterface {
    name = 'typingErrorsInCreatedAtColumn1620246740985';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Moderator" RENAME COLUMN "update_at" TO "updated_at"`,
        );
        await queryRunner.query(
            `ALTER TABLE "FieldJournal" RENAME COLUMN "update_at" TO "updated_at"`,
        );
        await queryRunner.query(
            `ALTER TABLE "Template" RENAME COLUMN "update_at" TO "updated_at"`,
        );
        await queryRunner.query(
            `ALTER TABLE "Etherapy" RENAME COLUMN "update_at" TO "updated_at"`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Etherapy" RENAME COLUMN "updated_at" TO "update_at"`,
        );
        await queryRunner.query(
            `ALTER TABLE "Template" RENAME COLUMN "updated_at" TO "update_at"`,
        );
        await queryRunner.query(
            `ALTER TABLE "FieldJournal" RENAME COLUMN "updated_at" TO "update_at"`,
        );
        await queryRunner.query(
            `ALTER TABLE "Moderator" RENAME COLUMN "updated_at" TO "update_at"`,
        );
    }
}
