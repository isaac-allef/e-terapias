import {MigrationInterface, QueryRunner} from "typeorm";

export class addIdentifierColumnInEtherapy1620655099178 implements MigrationInterface {
    name = 'addIdentifierColumnInEtherapy1620655099178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Etherapy" ADD "identifier" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Etherapy" ADD CONSTRAINT "UQ_66f7c505cab6185aaa605d9088e" UNIQUE ("identifier")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Etherapy" DROP CONSTRAINT "UQ_66f7c505cab6185aaa605d9088e"`);
        await queryRunner.query(`ALTER TABLE "Etherapy" DROP COLUMN "identifier"`);
    }

}
