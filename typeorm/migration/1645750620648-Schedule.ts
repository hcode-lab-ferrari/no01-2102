import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { columnId, columnCreatedAt, columnUpdatedAt } from "../columns";

export class Schedule1645750620648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "schedules",
            columns: [
                columnId,
                {
                    name: "personId",
                    type: "int",
                }, {
                    name: "timeOptionId",
                    type: "int",
                }, {
                    name: "paymentSituationId",
                    type: "int",
                }, {
                    name: "billingAddressId",
                    type: "int",
                }, {
                    name: "scheduleAt",
                    type: "datetime",
                }, {
                    name: "total",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                    default: 0,
                }, {
                    name: "installments",
                    type: "tinyint",
                    default: 1,
                },
                columnCreatedAt,
                columnUpdatedAt,
            ]
        }));

        await queryRunner.createForeignKey("schedules", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "persons",
            onDelete: "CASCADE",
            name: "FK_schedules_persons"
        }));

        await queryRunner.createForeignKey("schedules", new TableForeignKey({
            columnNames: ["timeOptionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "time_options",
            onDelete: "CASCADE",
            name: "FK_schedules_time_options"
        }));

        await queryRunner.createForeignKey("schedules", new TableForeignKey({
            columnNames: ["paymentSituationId"],
            referencedColumnNames: ["id"],
            referencedTableName: "payment_situations",
            onDelete: "CASCADE",
            name: "FK_schedules_payment_situations"
        }));

        await queryRunner.createForeignKey("schedules", new TableForeignKey({
            columnNames: ["billingAddressId"],
            referencedColumnNames: ["id"],
            referencedTableName: "addresses",
            onDelete: "CASCADE",
            name: "FK_schedules_addresses"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("schedules", "FK_schedules_addresses");
        await queryRunner.dropForeignKey("schedules", "FK_schedules_payment_situations");
        await queryRunner.dropForeignKey("schedules", "FK_schedules_time_options");
        await queryRunner.dropForeignKey("schedules", "FK_schedules_persons");
        await queryRunner.dropTable("schedules");
    }

}
