import { useState } from 'react';
import { initalAction } from '@/utils/enums';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable, Badge, Button, Dialog } from '@/components/custom';
import { MdAdd } from 'react-icons/md';
import { TAction } from '@/utils/enums';
import RoleAction from './RoleAction';
import { type TRolesData, useGetRoles } from '@/utils/connection/queryOptions';

type TRolesProps = {
   isSuccess: boolean;
   storeid: string;
};

const Roles = ({ isSuccess, storeid }: TRolesProps) => {
   const [select, setSetSelect] = useState(initalAction<TRolesData>());
   const { isLoading, data = [] } = useGetRoles<TRolesData[]>({ storeid, enabled: isSuccess });

   const rowAction = (props: TAction<TRolesData>) => {
      setSetSelect(props);
   };

   const setClose = ({ isDelete }: { isDelete?: boolean }) => {
      setSetSelect({ isOpen: false, type: isDelete ? 'delete' : 'add' });
   };

   return (
      <>
         <DataTable
            data={data?.filter(item=>!item.isGenerated) ?? []}
            isLoading={isLoading}
            columns={columns}
            rowAction={rowAction}
            headAction={
               <Button onClick={() => setSetSelect({ isOpen: true, type: 'add' })} size="sm" variant="outline" className="rounded-full">
                  <MdAdd className="text-base" /> Нэмэх
               </Button>
            }
         />

         <Dialog title="Хэрэглэгчдийн эрх" isOpen={select.isOpen} onOpenChange={(e) => setSetSelect({ type: 'add', isOpen: e })}>
            <RoleAction select={select} setClose={setClose} storeid={storeid} />
         </Dialog>
      </>
   );
};

export default Roles;

const columns: ColumnDef<TRolesData>[] = [
   {
      header: 'Хэрэглэгчийн эрх',
      accessorKey: 'name',
   },
   {
      header: 'Тайлбар',
      accessorKey: 'description',
      cell: ({ row }) => row.original.description?.slice(0, 90),
      enableSorting: false,
      // cell: ({ getValue }) => getValue()?.slice(0, 90),
   },
   {
      header: 'Төрөл',
      accessorKey: 'type',
      cell: ({ row }) => <Badge variant="secondary">{row.original.type}</Badge>,
   },
];
