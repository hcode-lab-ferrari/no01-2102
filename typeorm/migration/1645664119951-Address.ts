import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { columnCreatedAt, columnId, columnUpdatedAt, columnVarchar } from "../columns";

export class Address1645664119951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "addresses",
            columns: [
                columnId,
                columnVarchar("street"),
                columnVarchar("number", true, "16"),
                columnVarchar("complement", true),
                columnVarchar("district"),
                columnVarchar("city"),
                columnVarchar("state"),
                columnVarchar("country"),
                columnVarchar("zipcode", false, "8"),
                {
                    name: "personId",
                    type: "int",
                    isNullable: false,
                },
                columnCreatedAt,
                columnUpdatedAt,
            ]
        }));

        await queryRunner.createForeignKey("addresses", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "persons",
            onDelete: "CASCADE",
            name: "FK_addresses_persons",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("addresses", "FK_addresses_persons");
        await queryRunner.dropTable("addresses");
    }

}
