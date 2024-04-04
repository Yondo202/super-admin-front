// import { ColumnDef } from "@tanstack/react-table";

import "@tanstack/react-table"; //or vue, svelte, solid, qwik, etc.

// declare module '@tanstack/react-table' {
//   interface ColumnMeta<TData extends RowData, TValue> {
//     foo: string
//   }
// }

// // export {};

declare global {
  //   type ColumnTypes<T> = ColumnDef<T>
  // type ColumnDef<T> = {
  //   asAction?: boolean;
  // } & ColumnDef<T>;

  type TRowAction<T> = {
    type: "add" | "edit" | "delete";
    data: T;
  };
}

//    // type TActionsFunc<T> = (type:TActionTypes, data:T) => void
// }

// import '@tanstack/react-table'

// type ColumnDef = {
//    width?: number
//    className?: string
// }

// declare module '@tanstack/table-core' {
//    type ColumnDef<TData extends RowData, TValue = unknown> = DisplayColumnDef<TData, TValue> | GroupColumnDef<TData, TValue> | AccessorColumnDef<TData, TValue> | TColumnDef
// }
