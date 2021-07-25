import { MigrationInterface, QueryRunner } from "typeorm";

export class addedCascade1627231974210 implements MigrationInterface {
  name = "addedCascade1627231974210";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "infos" DROP CONSTRAINT "FK_4a89cefed9b11094397dd078400"`
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_7e7425b17f9e707331e9a6c7335"`
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_eaaa9558a54d382c16536386d6c"`
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
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_eaaa9558a54d382c16536386d6c" FOREIGN KEY ("infoId") REFERENCES "infos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_7e7425b17f9e707331e9a6c7335" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "infos" ADD CONSTRAINT "FK_4a89cefed9b11094397dd078400" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
