import {MigrationInterface, QueryRunner} from "typeorm";

export class addedInfo1626977752856 implements MigrationInterface {
    name = 'addedInfo1626977752856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_eaaa9558a54d382c16536386d6c"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "infoId"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "infoId" integer`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_eaaa9558a54d382c16536386d6c" FOREIGN KEY ("infoId") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_eaaa9558a54d382c16536386d6c"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "infoId"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "infoId" integer`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_eaaa9558a54d382c16536386d6c" FOREIGN KEY ("infoId") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
