import { DataTable, Button, Dialog } from '@/components/custom';
import { useGetUsers, type TUserData } from '@/utils/connection/queryOptions';
import { ColumnDef } from '@tanstack/react-table';
// import { MdAdd } from 'react-icons/md';
import { useState } from 'react';
import { TAction } from '@/utils/enums';
import { initalAction } from '@/utils/enums';
import UserAction from './UserAction';
import { VscSend } from "react-icons/vsc";

type TUserProps = {
   isSuccess: boolean;
   storeid: string;
};

const Users = ({ isSuccess, storeid }: TUserProps) => {
   const [select, setSetSelect] = useState(initalAction<TUserData>());

   const { data: usersData, isLoading: userLoading } = useGetUsers<TUserData[]>({ enabled: isSuccess, storeid });

   const rowAction = (props: TAction<TUserData>) => {
      setSetSelect(props);
   };

   const setClose = ({ isDelete }: { isDelete?: boolean }) => {
      setSetSelect({ isOpen: false, type: isDelete ? 'delete' : 'add' });
   };
   return (
      <>
         <DataTable
            data={usersData ?? []}
            isLoading={userLoading}
            columns={columns}
            // hideAction={true}
            rowAction={rowAction}
            headAction={
               <Button size="sm" variant="outline" className="rounded-full" onClick={() => setSetSelect({ isOpen: true, type: 'add' })}>
                  <VscSend /> Хэрэглэгч урих
               </Button>
            }
         />
         <Dialog className='w-[500px] overflow-visible' title="Хэрэглэгчид" isOpen={select.isOpen} onOpenChange={(e) => setSetSelect({ type: 'add', isOpen: e })}>
            <UserAction select={select} setClose={setClose} storeid={storeid} />
         </Dialog>
      </>
   );
};

export default Users;

const columns: ColumnDef<TUserData>[] = [
   {
      header: 'Нэр',
      accessorKey: 'firstName',
      cell: ({ row }) => `${row.original.lastName?.slice(0, 1)}. ${row.original.firstName}`,
   },
   {
      header: 'И-мэйл',
      accessorKey: 'email',
   },
   {
      header: 'Дугаар',
      accessorKey: 'phoneNumber',
      enableSorting: false,
   },
   {
      header: 'Үүсгэсэн',
      accessorKey: 'createdAt',
      cell: ({ row }) => `${row.original.createdAt.slice?.(0, 10)}`,
   },
];
