import {MigrationInterface, QueryRunner} from "typeorm";

export class removedEnumToMakeItCompatibleWithMssql1628245771256 implements MigrationInterface {
    name = 'removedEnumToMakeItCompatibleWithMssql1628245771256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56"`);
        await queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_7f49652dfc49378acb82a39b479"`);
        await queryRunner.query(`ALTER TABLE "infos" DROP COLUMN "place"`);
        await queryRunner.query(`DROP TYPE "public"."infos_place_enum"`);
        await queryRunner.query(`ALTER TABLE "infos" ADD "place" character varying NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE "infos" ADD CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_7f49652dfc49378acb82a39b479" FOREIGN KEY ("infoUuid") REFERENCES "infos"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_7f49652dfc49378acb82a39b479"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56"`);
        await queryRunner.query(`ALTER TABLE "infos" DROP CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f"`);
        await queryRunner.query(`ALTER TABLE "infos" DROP COLUMN "place"`);
        await queryRunner.query(`CREATE TYPE "public"."infos_place_enum" AS ENUM('iran', 'us', 'uk', 'canada', 'japan', 'unknown')`);
        await queryRunner.query(`ALTER TABLE "infos" ADD "place" "infos_place_enum" NOT NULL DEFAULT 'unknown'`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_7f49652dfc49378acb82a39b479" FOREIGN KEY ("infoUuid") REFERENCES "infos"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "infos" ADD CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
