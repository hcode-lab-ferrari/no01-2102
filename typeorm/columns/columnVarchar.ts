import { TableColumnOptions } from "typeorm";

export function columnVarchar(length: string = "255") {

    return {
        name: 'name',
        type: 'varchar',
        length
    } as TableColumnOptions

}