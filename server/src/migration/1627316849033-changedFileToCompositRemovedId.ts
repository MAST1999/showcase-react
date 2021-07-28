import { MigrationInterface, QueryRunner } from "typeorm";

export class changedFileToCompositRemovedId1627316849033
  implements MigrationInterface {
  name = "changedFileToCompositRemovedId1627316849033";

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
      `ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "infos" DROP CONSTRAINT "PK_be86029f65ae5c9d902e255013a"`
    );
    await queryRunner.query(`ALTER TABLE "infos" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "infos" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9"`
    );
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "infoId"`);
    await queryRunner.query(`ALTER TABLE "infos" ADD "userUuid" uuid`);
    await queryRunner.query(`ALTER TABLE "files" ADD "userUuid" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "PK_50a7ff4fa68a2369905baeeeb56" PRIMARY KEY ("userUuid")`
    );
    await queryRunner.query(`ALTER TABLE "files" ADD "infoUuid" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "PK_50a7ff4fa68a2369905baeeeb56"`
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "PK_941215c2376c0c45cd848a09fa7" PRIMARY KEY ("userUuid", "infoUuid")`
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "PK_941215c2376c0c45cd848a09fa7"`
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "PK_5e4535738d3cc6d950a2c9dc2f0" PRIMARY KEY ("uuid", "userUuid", "infoUuid")`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid")`
    );
    await queryRunner.query(
      `ALTER TABLE "infos" ADD CONSTRAINT "PK_8f486efd8ffb90ac3f516cabb9a" PRIMARY KEY ("uuid")`
    );
    await queryRunner.query(
      `ALTER TABLE "infos" ADD CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "FK_7f49652dfc49378acb82a39b479" FOREIGN KEY ("infoUuid") REFERENCES "infos"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_7f49652dfc49378acb82a39b479"`
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "FK_50a7ff4fa68a2369905baeeeb56"`
    );
    await queryRunner.query(
      `ALTER TABLE "infos" DROP CONSTRAINT "FK_6e43ef50c0b6548ddbf58fd7b8f"`
    );
    await queryRunner.query(
      `ALTER TABLE "infos" DROP CONSTRAINT "PK_8f486efd8ffb90ac3f516cabb9a"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1"`
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "PK_5e4535738d3cc6d950a2c9dc2f0"`
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "PK_941215c2376c0c45cd848a09fa7" PRIMARY KEY ("userUuid", "infoUuid")`
    );
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "PK_941215c2376c0c45cd848a09fa7"`
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "PK_50a7ff4fa68a2369905baeeeb56" PRIMARY KEY ("userUuid")`
    );
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "infoUuid"`);
    await queryRunner.query(
      `ALTER TABLE "files" DROP CONSTRAINT "PK_50a7ff4fa68a2369905baeeeb56"`
    );
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "userUuid"`);
    await queryRunner.query(`ALTER TABLE "infos" DROP COLUMN "userUuid"`);
    await queryRunner.query(`ALTER TABLE "files" ADD "infoId" integer`);
    await queryRunner.query(`ALTER TABLE "files" ADD "userId" integer`);
    await queryRunner.query(`ALTER TABLE "files" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id")`
    );
    await queryRunner.query(`ALTER TABLE "infos" ADD "userId" integer`);
    await queryRunner.query(`ALTER TABLE "infos" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "infos" ADD CONSTRAINT "PK_be86029f65ae5c9d902e255013a" PRIMARY KEY ("id")`
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`
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
