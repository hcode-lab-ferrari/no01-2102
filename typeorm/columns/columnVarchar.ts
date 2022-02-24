import { TableColumnOptions } from "typeorm";

export function columnVarchar(name: string = "name", canBeNull: boolean = false, length: string = "255") {

    return {
        name,
        type: 'varchar',
        isNullable: canBeNull,
        length,
    } as TableColumnOptions

}