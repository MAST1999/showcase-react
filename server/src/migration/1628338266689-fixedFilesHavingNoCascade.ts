import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedFilesHavingNoCascade1628338266689 implements MigrationInterface {
    name = 'fixedFilesHavingNoCascade1628338266689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("uuid" uniqueidentifier NOT NULL CONSTRAINT "DF_951b8f1dfc94ac1d0301a14b7e1" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_204e9b624861ff4a5b268192101" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b" DEFAULT getdate(), "username" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "infos" ("uuid" uniqueidentifier NOT NULL CONSTRAINT "DF_8f486efd8ffb90ac3f516cabb9a" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_72530421d4489079cd48b8eb168" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_b33a6b0c58e19ab346bb1d3914c" DEFAULT getdate(), "title" nvarchar(255), "place" nvarchar(255) NOT NULL CONSTRAINT "DF_152869d12ebadb79e31d203cae0" DEFAULT 'unknown', "userUuid" uniqueidentifier, CONSTRAINT "PK_8f486efd8ffb90ac3f516cabb9a" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "files" ("uuid" uniqueidentifier NOT NULL CONSTRAINT "DF_80216965527c9be0babd7ea5bbe" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_2901752f1d771f97a8bb45cb4c9" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_7437cbd77a8bd7c769d4df7a271" DEFAULT getdate(), "description" nvarchar(255), "filename" nvarchar(255) NOT NULL, "link" nvarchar(255) NOT NULL, "userUuid" uniqueidentifier, "infoUuid" uniqueidentifier, CONSTRAINT "UQ_134735cc45672b90b366c20dc35" UNIQUE ("filename"), CONSTRAINT "PK_80216965527c9be0babd7ea5bbe" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "infos" ADD CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_7f49652dfc49378acb82a39b479" FOREIGN KEY ("infoUuid") REFERENCES "infos"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_7f49652dfc49378acb82a39b479"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56"`);
        await queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "infos"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
