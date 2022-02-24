import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { columnCreatedAt, columnId, columnUpdatedAt, columnVarchar } from "../columns";

export class PaymentSituation1645743850629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "payment_situations",
            columns: [
                columnId,
                columnVarchar("name", false, "45"),
                columnCreatedAt,
                columnUpdatedAt,
            ],
        }));

        const situations = ['Aguardando Pagamento', 'Cancelado', 'Pagamento Aprovado', 'Pagamento Estornado', 'Em mediação', 'Enviado'];

        situations.map(async (item) => {
            await queryRunner.query(`INSERT INTO payment_situations(name) VALUES ('${item}');`);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payment_situations");
    }

}
