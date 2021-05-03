import { MigrationInterface, QueryRunner } from 'typeorm';

export default class initialEntities1620072716329
    implements MigrationInterface {
    name = 'initialEntities1620072716329';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "Moderator" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "token" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_56b87353653d02ffe789cb93804" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "FieldJournal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "fields" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "moderatorId" uuid, "etherapyId" uuid, CONSTRAINT "PK_550ecd4a69dfb9460345f4b0243" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "Template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "templateFields" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7620e9c931e157992fe7b8f2287" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "Etherapy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "templateId" uuid, CONSTRAINT "PK_8c8f88c524d5affa585e5eb57e6" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "etherapy_moderators__moderator" ("etherapyId" uuid NOT NULL, "moderatorId" uuid NOT NULL, CONSTRAINT "PK_a04ddf35dbdd81b18a23c587919" PRIMARY KEY ("etherapyId", "moderatorId"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_6e5eeb6cffc79a138c3d69bb58" ON "etherapy_moderators__moderator" ("etherapyId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_de972fe4c490bd712d92c5b3c7" ON "etherapy_moderators__moderator" ("moderatorId") `,
        );
        await queryRunner.query(
            `ALTER TABLE "FieldJournal" ADD CONSTRAINT "FK_758957474b1718e462b2fe55862" FOREIGN KEY ("moderatorId") REFERENCES "Moderator"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "FieldJournal" ADD CONSTRAINT "FK_93619692e5d1750d48e5286fe56" FOREIGN KEY ("etherapyId") REFERENCES "Etherapy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "Etherapy" ADD CONSTRAINT "FK_dcc7f7fbdb6280c3fe08dc17de6" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "etherapy_moderators__moderator" ADD CONSTRAINT "FK_6e5eeb6cffc79a138c3d69bb587" FOREIGN KEY ("etherapyId") REFERENCES "Etherapy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "etherapy_moderators__moderator" ADD CONSTRAINT "FK_de972fe4c490bd712d92c5b3c7f" FOREIGN KEY ("moderatorId") REFERENCES "Moderator"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "etherapy_moderators__moderator" DROP CONSTRAINT "FK_de972fe4c490bd712d92c5b3c7f"`,
        );
        await queryRunner.query(
            `ALTER TABLE "etherapy_moderators__moderator" DROP CONSTRAINT "FK_6e5eeb6cffc79a138c3d69bb587"`,
        );
        await queryRunner.query(
            `ALTER TABLE "Etherapy" DROP CONSTRAINT "FK_dcc7f7fbdb6280c3fe08dc17de6"`,
        );
        await queryRunner.query(
            `ALTER TABLE "FieldJournal" DROP CONSTRAINT "FK_93619692e5d1750d48e5286fe56"`,
        );
        await queryRunner.query(
            `ALTER TABLE "FieldJournal" DROP CONSTRAINT "FK_758957474b1718e462b2fe55862"`,
        );
        await queryRunner.query(`DROP INDEX "IDX_de972fe4c490bd712d92c5b3c7"`);
        await queryRunner.query(`DROP INDEX "IDX_6e5eeb6cffc79a138c3d69bb58"`);
        await queryRunner.query(`DROP TABLE "etherapy_moderators__moderator"`);
        await queryRunner.query(`DROP TABLE "Etherapy"`);
        await queryRunner.query(`DROP TABLE "Template"`);
        await queryRunner.query(`DROP TABLE "FieldJournal"`);
        await queryRunner.query(`DROP TABLE "Moderator"`);
    }
}
