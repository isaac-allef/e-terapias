import {MigrationInterface, QueryRunner} from "typeorm";

export class makeUniqueColumnEmailInModerator1620656086337 implements MigrationInterface {
    name = 'makeUniqueColumnEmailInModerator1620656086337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "Moderator"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Moderator" ADD CONSTRAINT "UQ_454ddd3dfb4f14f71afe54e1217" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Moderator" DROP CONSTRAINT "UQ_454ddd3dfb4f14f71afe54e1217"`);
        await queryRunner.query(`COMMENT ON COLUMN "Moderator"."email" IS NULL`);
    }

}
