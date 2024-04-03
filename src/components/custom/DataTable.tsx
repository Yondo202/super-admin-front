import { Empty, Loading } from '@/assets/svg'
import * as React from 'react'
import { RxDotsHorizontal } from "react-icons/rx";
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Checkbox, Button, FloatingLabelInput } from '@/components/ui'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { GoTrash, GoPencil } from "react-icons/go";
import { PiPath } from "react-icons/pi";
import { BiSearchAlt } from "react-icons/bi";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { TfiArrowsVertical } from "react-icons/tfi";


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DataTableProps<T> {
   columns: ColumnDef<T>[]
   data: T[]
   isLoading?: boolean
}
const defaultPageSize = 8
const colSize = 180.666 // ene value auto oor avagdaj baigaa bolohoor .666 gej speacial oruulsan

export default function DataTable<T extends object>({ columns, data, isLoading }: DataTableProps<T>) {
   const [globalFilter, setGlobalFilter] = React.useState('')
   const [sorting, setSorting] = React.useState<SortingState>([])
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
   const [rowSelection, setRowSelection] = React.useState({})

   // console.log(data.id)

   const table = useReactTable({
      data,
      columns: [
         // {
         //    id: 'select',
         //    header: ({ table }) => (
         //       <Checkbox
         //          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
         //          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
         //          aria-label="Select all"
         //       />
         //    ),
         //    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
         //    enableSorting: false,
         //    enableHiding: false,
         //    size: 40,
         // },
         ...columns,
         {
            id: 'actions',
            size: 70,
            enableHiding: false,
            cell: () => {
               // const rowdata = row.original
               return (
                  <div className="flex justify-center">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" className="h-8 w-8 p-0">
                              {/* <span className="sr-only">Open menu</span> */}
                              <RxDotsHorizontal className="h-4 w-4" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuLabel className="text-muted-text">Үйлдэл</DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem className="gap-3">
                              <GoPencil  /> Засах
                           </DropdownMenuItem>
                           <DropdownMenuItem className="gap-3">
                              <GoTrash /> Устгах
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
               )
            },
         },
      ],
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      onGlobalFilterChange: setGlobalFilter,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         rowSelection,
         globalFilter,
      },
      initialState: {
         pagination: {
            pageIndex: 0,
            pageSize: defaultPageSize,
         },
      },
      defaultColumn: {
         size: colSize, //starting column size
         minSize: 40, //enforced during column resizing
         maxSize: 500, //enforced during column resizing
      },
   })

   return (
      <div className="w-full">
         <div className="wrapper_card overflow-hidden">
            <div className="flex items-center px-6 py-4">
               <FloatingLabelInput
                  // label="Нэрээр хайх..."
                  // value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                  // onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                  beforeAddon={<BiSearchAlt />}
                  className="w-60 rounded-full"
                  sizes="sm"
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(String(e.target.value))}
                  label="Бүх талбараар хайх..."
               />

               <Popover>
                  <PopoverTrigger asChild>
                     <Button variant="outline" size="icon" className="ml-auto">
                        {/* Харагдац <ChevronDownIcon className="ml-2 h-4 w-4" /> */}
                        <PiPath className="text-primary" />
                     </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-52" align="end">
                     {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                           return (
                              <div className="flex gap-3.5 py-1.5" key={column.id}>
                                 <Checkbox checked={column.getIsVisible()} id={column.id} onCheckedChange={(value) => column.toggleVisibility(!!value)} aria-label="Select all" />
                                 <label className="one_line cursor-pointer" htmlFor={column.id}>
                                    {column?.columnDef?.header?.toString()}
                                 </label>
                              </div>
                           )
                        })}

                     {/* <div>asdas</div>
                     <div>asdas</div>
                     <div>asdas</div> */}
                  </PopoverContent>
               </Popover>
               {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" size="icon" className="ml-auto">
                        <Route size={17} strokeWidth={1.4} className="stroke-primary" />
                     </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                     {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                           return (
                              <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                                 {column?.columnDef?.header?.toString()}
                              </DropdownMenuCheckboxItem>
                           )
                        })}
                  </DropdownMenuContent>
               </DropdownMenu> */}
            </div>

            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           const size = header.column.getSize()
                           return (
                              <TableHead
                                 key={header.id}
                                 style={{ width: size, maxWidth: size }}
                                 {...{
                                    onClick: header.column.getToggleSortingHandler(),
                                 }}
                                 className={header.column.getCanSort() ? `hover:bg-hover-bg ${header.column.getIsSorted() ? `bg-hover-bg` : ``}` : ``}
                              >
                                 <div className="relative cursor-pointer">
                                    {/* {header.column.getCanSort() && !header.column.getIsSorted() && <TwoSideArrow />} */}
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    <div className="absolute right-px top-2/4 -translate-y-2/4">
                                       {header.column.getCanSort() && !header.column.getIsSorted() && <TfiArrowsVertical className="opacity-50" />}
                                       {{
                                          asc: <BsArrowUp />,
                                          desc: <BsArrowDown />,
                                       }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                 </div>
                              </TableHead>
                           )
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                           {row.getVisibleCells().map((cell) => {
                              const size = cell.column.getSize()
                              return (
                                 <TableCell
                                    key={cell.id}
                                    // style={size !== colSize ? { width: size, maxWidth: size } : {}}

                                    style={{ width: size, maxWidth: size }}
                                    className={`one_line ${cell.column.id === 'actions' ? `p-0` : ``} ${cell.column.getIsSorted() ? `bg-hover-bg` : ``}`}
                                 >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                 </TableCell>
                              )
                           })}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={columns.length + 2}>
                           <div className="flex h-48 w-full flex-col items-center justify-center gap-5">
                              {isLoading ? (
                                 <Loading className="w-12 animate-spin fill-primary" />
                              ) : (
                                 <>
                                    <Empty />
                                    <div className="text-muted-text">Мэдээлэл байхгүй байна</div>
                                 </>
                              )}
                           </div>
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <div className="flex w-full items-center justify-between space-x-2 py-4">
            <Select
               defaultValue={defaultPageSize.toString()}
               onValueChange={(e) => {
                  table.setPageSize(Number(e))
               }}
            >
               <SelectTrigger className="w-[65px] text-xs p-2.5 py-1.5 h-8">
                  <SelectValue placeholder="5" />
               </SelectTrigger>
               <SelectContent>
                  {[defaultPageSize, 20, 30, 40, 50].map((pageSize) => (
                     <SelectItem key={pageSize} value={pageSize.toString()}>
                        {pageSize}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>

            <Pagination>
               <PaginationContent>
                  <PaginationItem>
                     <PaginationPrevious className="text-xs" size="sm" isActive={table.getCanPreviousPage()} onClick={() => table.previousPage()} href="#" />
                  </PaginationItem>

                  {Array.from({ length: table.getPageCount() })?.map((_, index) => {
                     return (
                        <PaginationItem key={index}>
                           <PaginationLink className="border-border" onClick={() => table.setPageIndex(index)} isActive={index === table.getState().pagination?.pageIndex} href="#">
                              {index + 1}
                           </PaginationLink>
                        </PaginationItem>
                     )
                  })}

                  <PaginationItem>
                     <PaginationNext className="text-xs" size="sm" isActive={table.getCanNextPage()} onClick={() => (table.getCanNextPage() ? table.nextPage() : null)} href="#" />
                  </PaginationItem>
               </PaginationContent>
            </Pagination>
         </div>
      </div>
   )
}
