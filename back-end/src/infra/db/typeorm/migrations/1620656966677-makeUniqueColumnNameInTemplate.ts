import {MigrationInterface, QueryRunner} from "typeorm";

export class makeUniqueColumnNameInTemplate1620656966677 implements MigrationInterface {
    name = 'makeUniqueColumnNameInTemplate1620656966677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "Template"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Template" ADD CONSTRAINT "UQ_ad0e1bb256d7430086782f80fd9" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Template" DROP CONSTRAINT "UQ_ad0e1bb256d7430086782f80fd9"`);
        await queryRunner.query(`COMMENT ON COLUMN "Template"."name" IS NULL`);
    }

}
