import {MigrationInterface, QueryRunner} from "typeorm";

export class addRoleColumnInUser1620430997615 implements MigrationInterface {
    name = 'addRoleColumnInUser1620430997615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Moderator" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Moderator" DROP COLUMN "role"`);
    }

}
