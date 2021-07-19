import { MigrationInterface, QueryRunner } from 'typeorm';

export default class addDeletedAtToModerator1626730797656
    implements MigrationInterface {
    name = 'addDeletedAtToModerator1626730797656';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Moderator" ADD "deletedAt" TIMESTAMP`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Moderator" DROP COLUMN "deletedAt"`,
        );
    }
}
