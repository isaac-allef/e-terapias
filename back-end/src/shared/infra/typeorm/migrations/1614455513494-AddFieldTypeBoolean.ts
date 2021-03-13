import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddFieldTypeBoolean1614455513494
    implements MigrationInterface {
    name = 'AddFieldTypeBoolean1614455513494';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "field" ADD "boolean_value" boolean`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "field" DROP COLUMN "boolean_value"`,
        );
    }
}
