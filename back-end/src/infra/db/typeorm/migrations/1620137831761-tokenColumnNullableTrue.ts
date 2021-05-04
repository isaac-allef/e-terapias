import { MigrationInterface, QueryRunner } from 'typeorm';

export default class tokenColumnNullableTrue1620137831761
    implements MigrationInterface {
    name = 'tokenColumnNullableTrue1620137831761';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Moderator" ALTER COLUMN "token" DROP NOT NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "Moderator"."token" IS NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `COMMENT ON COLUMN "Moderator"."token" IS NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "Moderator" ALTER COLUMN "token" SET NOT NULL`,
        );
    }
}
