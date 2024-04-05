import { createFileRoute } from '@tanstack/react-router';
import { Header, Skeleton, DataTable, Badge, Button } from '@/components/custom';
import { useStoreGetById, useGetUsers, type UserData } from '@/utils/connection/queryOptions';
import { ColumnDef } from '@tanstack/react-table';
import { MdAdd } from 'react-icons/md';

export const Route = createFileRoute('/_dashboard/stores/$storeid')({
   beforeLoad: ({ search }: { search: Record<string, unknown> }) => {
      return {
         breadcrumbs: [
            { title: 'Вэбийн жагсаалт', toLink: '/' },
            { title: (search.title as string) || 'Вэб', toLink: '/', isActive: true },
         ],
      };
   },
   component: StoreComponent,
});

function StoreComponent() {
   const { storeid } = Route.useParams();
   const { data, isLoading, isSuccess } = useStoreGetById({ idKey: storeid });
   const { data: usersData, isLoading: userLoading } = useGetUsers({ enabled: isSuccess, idKey: storeid });

   // const context = Route.useRouteContext()
   // console.log(context, "-------------->context")
   return (
      <div>
         <Header title={data?.name} />

         <div className="grid grid-cols-[1fr_340px] gap-8">
            {isLoading ? (
               <>
                  <Skeleton className="h-96" />
                  <Skeleton />
               </>
            ) : (
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
                  <div className="wrapper p-5 h-fit">
                     <div className="flex gap-3.5 align-center mb-4">
                        <div className="text-muted-text">Нэр:</div>
                        <div>{data?.name}</div>
                     </div>
                     <div className="flex gap-3.5 align-center mb-4">
                        <div className="text-muted-text">Домайн:</div>
                        <div>{data?.domain}</div>
                     </div>
                     <div className="flex gap-3.5 align-center mb-4">
                        <div className="text-muted-text">Үүсгэсэн:</div>
                        <div>{data?.createdAt?.slice(0, 10)}</div>
                     </div>
                     {data?.status && (
                        <div className="flex gap-3.5 align-center mb-4">
                           <div className="text-muted-text text-xs">Төлөв:</div>
                           <Badge variant="secondary">{data?.status}</Badge>
                        </div>
                     )}
                     <div className="flex gap-3.5 align-center mb-4 ">
                        <div className="text-muted-text">Багц:</div>
                        <Badge>{data?.plan?.name}</Badge>
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

const columns: ColumnDef<UserData>[] = [
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
