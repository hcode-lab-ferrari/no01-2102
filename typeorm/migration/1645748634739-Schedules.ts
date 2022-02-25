import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { columnCreatedAt, columnId, columnUpdatedAt } from "../columns";

export class Schedules1645748634739 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "schedules",
            columns: [columnId, {
                type: "int",
                name: "personId"
            }, {
                type: "int",
                name: "timeOptionId"
            }, {
                type: "int",
                name: "paymentSituationId"
            }, {
                type: "int",
                name: "billingAddressId"
            }, {
                type: "date",
                name: "scheduleAt"
            }, {
                type: "decimal",
                precision: 10,
                scale: 2,
                name: "total"
            }, {
                type: "tinyint",
                name: "installments",
                default: 1
            }, columnUpdatedAt, columnCreatedAt]
        }));

        await queryRunner.createForeignKey("schedules", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "persons",
            name: "FK_schedules_persons",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("schedules", new TableForeignKey({
            columnNames: ["timeOptionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "time_options",
            name: "FK_schedules_time_options",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("schedules", new TableForeignKey({
            columnNames: ["paymentSituationId"],
            referencedColumnNames: ["id"],
            referencedTableName: "payment_situations",
            name: "FK_schedules_payment_situations",
            onDelete: "CASCADE",
        }));

        await queryRunner.createForeignKey("schedules", new TableForeignKey({
            columnNames: ["billingAddressId"],
            referencedColumnNames: ["id"],
            referencedTableName: "addresses",
            name: "FK_schedules_addresses",
            onDelete: "CASCADE",
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        const fks = [
            "FK_schedules_addresses",
            "FK_schedules_payment_situations",
            "FK_schedules_time_options",
            "FK_schedules_persons"
        ];

        for (const fkName of fks) {
            await queryRunner.dropForeignKey(
                "schedules",
                fkName
            );
        }
        
        await queryRunner.dropTable("schedules");
    }

}
