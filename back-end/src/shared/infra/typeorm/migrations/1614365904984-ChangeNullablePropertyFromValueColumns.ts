import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeNullablePropertyFromValueColumns1614365904984
    implements MigrationInterface {
    name = 'ChangeNullablePropertyFromValueColumns1614365904984';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "field" ALTER COLUMN "string_value" DROP NOT NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "field"."string_value" IS NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "field" ALTER COLUMN "int_value" DROP NOT NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "field"."int_value" IS NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "field" ALTER COLUMN "date_value" DROP NOT NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "field"."date_value" IS NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `COMMENT ON COLUMN "field"."date_value" IS NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "field" ALTER COLUMN "date_value" SET NOT NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "field"."int_value" IS NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "field" ALTER COLUMN "int_value" SET NOT NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "field"."string_value" IS NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "field" ALTER COLUMN "string_value" SET NOT NULL`,
        );
    }
}
