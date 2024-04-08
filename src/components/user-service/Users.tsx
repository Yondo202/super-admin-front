import { DataTable, Button } from '@/components/custom';
import {  useGetUsers, type TUserData } from '@/utils/connection/queryOptions';
import { ColumnDef } from '@tanstack/react-table';
import { MdAdd } from 'react-icons/md';


type TUserProps = {
    isSuccess:boolean
    storeid:string
}

const Users = ({ isSuccess, storeid }:TUserProps) => {
    const { data: usersData, isLoading: userLoading } = useGetUsers({ enabled: isSuccess, idKey: storeid });

   return (
      <>
         <DataTable
            data={usersData ?? []}
            isLoading={userLoading}
            columns={columns}
            hideAction={true}
            headAction={
               <Button size="sm" variant="outline" className="rounded-full">
                  <MdAdd className="text-base" /> Нэмэх
               </Button>
            }
         />
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
 