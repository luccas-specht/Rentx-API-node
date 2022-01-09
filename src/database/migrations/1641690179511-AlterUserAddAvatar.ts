/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddAvatar1641690179511 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", 
         new TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
            default: null
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar')
    }

}
