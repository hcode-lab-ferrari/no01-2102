import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Contact1645492294478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "contacts",
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
            }, {
                name: "personId",
                type: "int",
                isNullable: false,
            }, {
                name: "email",
                type: "varchar",
                length: "250",
                isNullable: false,
            }, {
                name: "message",
                type: "text",
                isNullable: false,
            }, {
                name: "createdAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP",
            }, {
                name: "updatedAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP",
            }]
        }));

        await queryRunner.createForeignKey("contacts", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "persons",
            name: "FK_contacts_persons",
            onDelete: "CASCADE",
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("contacts", "FK_contacts_persons");
        await queryRunner.dropTable("contacts");
    }

}
