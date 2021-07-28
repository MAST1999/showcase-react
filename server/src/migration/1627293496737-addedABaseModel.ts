import { MigrationInterface, QueryRunner } from "typeorm";

export class addedABaseModel1627293496737 implements MigrationInterface {
  name = "addedABaseModel1627293496737";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "infos" RENAME COLUMN "list" TO "place"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."infos_list_enum" RENAME TO "infos_place_enum"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "infos_place_enum" RENAME TO "infos_list_enum"`
    );
    await queryRunner.query(
      `ALTER TABLE "infos" RENAME COLUMN "place" TO "list"`
    );
  }
}
