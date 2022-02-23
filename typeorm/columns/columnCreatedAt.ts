import { TableColumnOptions } from "typeorm";

export const columnCreatedAt = {
    name: "createdAt",
    type: "datetime",
    default: "CURRENT_TIMESTAMP",
} as TableColumnOptions;