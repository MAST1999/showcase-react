import {MigrationInterface, QueryRunner} from "typeorm";

export class enabledCascadeInFile1627335485345 implements MigrationInterface {
    name = 'enabledCascadeInFile1627335485345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56"`);
        await queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_7f49652dfc49378acb82a39b479"`);
        await queryRunner.query(`ALTER TABLE "infos" ADD CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_7f49652dfc49378acb82a39b479" FOREIGN KEY ("infoUuid") REFERENCES "infos"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_7f49652dfc49378acb82a39b479"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56"`);
        await queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f"`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_7f49652dfc49378acb82a39b479" FOREIGN KEY ("infoUuid") REFERENCES "infos"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "infos" ADD CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
