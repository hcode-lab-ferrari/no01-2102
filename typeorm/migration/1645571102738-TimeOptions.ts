import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class TimeOptions1645571102738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "time_options",
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
            }, {
                name: "day",
                type: "tinyint",
                isNullable: false,
            }, {
                name: "time",
                type: "time",
                isNullable: false,
            }, {
                name: "createdAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP",
            }, {
                name: "updatedAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP",
            }],
        }));

        for (let i = 0; i <= 6; i++) {
            await queryRunner.query(`INSERT INTO time_options(day, time) VALUES (${i}, '09:00'), (${i}, '10:00'), (${i}, '11:00'), (${i}, '12:00');`);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("time_options");
    }

}
