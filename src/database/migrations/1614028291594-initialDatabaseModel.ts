import { MigrationInterface, QueryRunner } from 'typeorm';

export default class initialDatabaseModel1614028291594
    implements MigrationInterface {
    name = 'initialDatabaseModel1614028291594';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "field" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "string_value" character varying NOT NULL, "int_value" integer NOT NULL, "date_value" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "fieldJournalId" uuid, CONSTRAINT "PK_39379bba786d7a75226b358f81e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "moderator" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c759e446a41418e605c90f15a3" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "field_journal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "moderatorId" uuid, "eterapiaId" uuid, CONSTRAINT "PK_713c60217381b3bf5c4c90d1ef3" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "field_journal_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_63e307609c0b7d0ca7ec3e4a543" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "eterapia" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "fieldJournalModelId" uuid, CONSTRAINT "PK_6388780e9020d26b99e71f3f6eb" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "eterapia_moderators_moderator" ("eterapiaId" uuid NOT NULL, "moderatorId" uuid NOT NULL, CONSTRAINT "PK_1461aabac2e5260255739acd4bd" PRIMARY KEY ("eterapiaId", "moderatorId"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_e78edeca36a916865f3527ea93" ON "eterapia_moderators_moderator" ("eterapiaId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_779e105e202f917d793a295304" ON "eterapia_moderators_moderator" ("moderatorId") `,
        );
        await queryRunner.query(
            `ALTER TABLE "field" ADD CONSTRAINT "FK_eba04e9f5ff1c40dfca4b8d0190" FOREIGN KEY ("fieldJournalId") REFERENCES "field_journal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal" ADD CONSTRAINT "FK_cddf3598ab1afa902d4beb8c702" FOREIGN KEY ("moderatorId") REFERENCES "moderator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal" ADD CONSTRAINT "FK_9fc8c50311b31f820fd67c58ff0" FOREIGN KEY ("eterapiaId") REFERENCES "eterapia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "eterapia" ADD CONSTRAINT "FK_acad9a6e817f5156e6696eeb4c8" FOREIGN KEY ("fieldJournalModelId") REFERENCES "field_journal_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "eterapia_moderators_moderator" ADD CONSTRAINT "FK_e78edeca36a916865f3527ea93a" FOREIGN KEY ("eterapiaId") REFERENCES "eterapia"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "eterapia_moderators_moderator" ADD CONSTRAINT "FK_779e105e202f917d793a295304f" FOREIGN KEY ("moderatorId") REFERENCES "moderator"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "eterapia_moderators_moderator" DROP CONSTRAINT "FK_779e105e202f917d793a295304f"`,
        );
        await queryRunner.query(
            `ALTER TABLE "eterapia_moderators_moderator" DROP CONSTRAINT "FK_e78edeca36a916865f3527ea93a"`,
        );
        await queryRunner.query(
            `ALTER TABLE "eterapia" DROP CONSTRAINT "FK_acad9a6e817f5156e6696eeb4c8"`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal" DROP CONSTRAINT "FK_9fc8c50311b31f820fd67c58ff0"`,
        );
        await queryRunner.query(
            `ALTER TABLE "field_journal" DROP CONSTRAINT "FK_cddf3598ab1afa902d4beb8c702"`,
        );
        await queryRunner.query(
            `ALTER TABLE "field" DROP CONSTRAINT "FK_eba04e9f5ff1c40dfca4b8d0190"`,
        );
        await queryRunner.query(`DROP INDEX "IDX_779e105e202f917d793a295304"`);
        await queryRunner.query(`DROP INDEX "IDX_e78edeca36a916865f3527ea93"`);
        await queryRunner.query(`DROP TABLE "eterapia_moderators_moderator"`);
        await queryRunner.query(`DROP TABLE "eterapia"`);
        await queryRunner.query(`DROP TABLE "field_journal_model"`);
        await queryRunner.query(`DROP TABLE "field_journal"`);
        await queryRunner.query(`DROP TABLE "moderator"`);
        await queryRunner.query(`DROP TABLE "field"`);
    }
}
