// import { DisplayColumnDef, GroupColumnDef, AccessorColumnDef } from '@tanstack/react-table'

// // export {};

// declare global {
//    //   type ColumnTypes<T> = ColumnDef<T>
//    type TColumnDef<T> = {
//       width?: number
//    } & ColumnDef<T>
//    type TActionTypes = 'add' | 'edit' | 'delete'
//    type TActionState<T> = {
//       type: TActionTypes
//       open: boolean
//       data: T
//    }

//    // type TActionsFunc<T> = (type:TActionTypes, data:T) => void
// }

// import '@tanstack/react-table'

// type TColumnDef = {
//    width?: number
//    className?: string
// }

// declare module '@tanstack/table-core' {
//    type ColumnDef<TData extends RowData, TValue = unknown> = DisplayColumnDef<TData, TValue> | GroupColumnDef<TData, TValue> | AccessorColumnDef<TData, TValue> | TColumnDef
// }
