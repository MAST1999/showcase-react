import { MigrationInterface, QueryRunner } from "typeorm";

export class changedUserAddedFileInfo1627281401044
  implements MigrationInterface {
  name = "changedUserAddedFileInfo1627281401044";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "infos_list_enum" AS ENUM('iran', 'us', 'uk', 'canada', 'japan', 'unknown')`
    );
    await queryRunner.query(
      `CREATE TABLE "infos" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying, "list" "infos_list_enum" NOT NULL DEFAULT 'unknown', "userId" integer, CONSTRAINT "PK_be86029f65ae5c9d902e255013a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying, "filename" character varying NOT NULL, "link" character varying NOT NULL, "userId" integer, "infoId" integer, CONSTRAINT "UQ_134735cc45672b90b366c20dc35" UNIQUE ("filename"), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "infos" ADD CONSTRAINT "FK_4a89cefed9b11094397dd078400" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_7e7425b17f9e707331e9a6c7335" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_eaaa9558a54d382c16536386d6c" FOREIGN KEY ("infoId") REFERENCES "infos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_eaaa9558a54d382c16536386d6c"`
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_7e7425b17f9e707331e9a6c7335"`
    );
    await queryRunner.query(
      `ALTER TABLE "infos" DROP CONSTRAINT "FK_4a89cefed9b11094397dd078400"`
    );
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "infos"`);
    await queryRunner.query(`DROP TYPE "infos_list_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
