import { MigrationInterface, QueryRunner } from "typeorm";

export class addedNumberAndTwoDropDownsToFileFixedInfoDateDefault1628464838327 implements MigrationInterface {
  name = 'addedNumberAndTwoDropDownsToFileFixedInfoDateDefault1628464838327'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" ADD "number" int NOT NULL CONSTRAINT "DF_58da2f7ffd05a9d275efb2894b3" DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "files" ADD "version" int NOT NULL CONSTRAINT "DF_ffaf66a00026741303e6e383354" DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "files" ADD "type" int NOT NULL CONSTRAINT "DF_bbb0f2912c320f6b76e04091e32" DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "files" ADD "date" nvarchar(255) NOT NULL CONSTRAINT "DF_2be52542e58c262805285c48592" DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "infos" ALTER COLUMN "date" nvarchar(255)`);
    await queryRunner.query(`ALTER TABLE "infos" ADD CONSTRAINT "DF_22f14f2ad0d735920b617d8e744" DEFAULT '' FOR "date"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "DF_22f14f2ad0d735920b617d8e744"`);
    await queryRunner.query(`ALTER TABLE "infos" ALTER COLUMN "date" nvarchar(255)`);
    await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "DF_2be52542e58c262805285c48592"`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "date"`);
    await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "DF_bbb0f2912c320f6b76e04091e32"`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "DF_ffaf66a00026741303e6e383354"`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "DF_58da2f7ffd05a9d275efb2894b3"`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "number"`);
  }

}
