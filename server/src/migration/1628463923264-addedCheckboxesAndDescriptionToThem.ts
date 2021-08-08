import { MigrationInterface, QueryRunner } from "typeorm";

export class addedCheckboxesAndDescriptionToThem1628463923264 implements MigrationInterface {
  name = 'addedCheckboxesAndDescriptionToThem1628463923264'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "infos" ADD "checkboxes" int NOT NULL CONSTRAINT "DF_8893b70050a17acf743630d9b96" DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "infos" ADD "descCheckboxOne" text CONSTRAINT "DF_3cfd8751d029458f1011b9ff169" DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "infos" ADD "descCheckboxTwo" text CONSTRAINT "DF_51008af331be87d8a6d161418d7" DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "infos" ADD "descCheckboxThree" text CONSTRAINT "DF_d559f33e9f716c097e1f8d1d4c5" DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "infos" ADD "date" nvarchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "infos" DROP COLUMN "date"`);
    await queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "DF_d559f33e9f716c097e1f8d1d4c5"`);
    await queryRunner.query(`ALTER TABLE "infos" DROP COLUMN "descCheckboxThree"`);
    await queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "DF_51008af331be87d8a6d161418d7"`);
    await queryRunner.query(`ALTER TABLE "infos" DROP COLUMN "descCheckboxTwo"`);
    await queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "DF_3cfd8751d029458f1011b9ff169"`);
    await queryRunner.query(`ALTER TABLE "infos" DROP COLUMN "descCheckboxOne"`);
    await queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "DF_8893b70050a17acf743630d9b96"`);
    await queryRunner.query(`ALTER TABLE "infos" DROP COLUMN "checkboxes"`);
  }

}
