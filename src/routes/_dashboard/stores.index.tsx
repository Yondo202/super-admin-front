import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { DataTable, Header } from '@/components/custom';
import { ColumnDef } from '@tanstack/react-table';
import { useSuspenseQuery } from '@tanstack/react-query';
import { storeQueryOptions, TStore } from '@/utils/connection/queryOptions';
import { TAction } from '@/utils/connection/sharedTypes';

export const Route = createFileRoute('/_dashboard/stores/')({
   loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(storeQueryOptions),
   beforeLoad: () => ({ breadcrumbs: [{ title: 'Вэбийн жагсаалт', toLink: '/stores' }] }),
   component: () => <Dashboard />,
});

function Dashboard() {
   const navigate = useNavigate({ from: '/stores' });
   const { data = [], isLoading } = useSuspenseQuery(storeQueryOptions);

   const rowAction = ({ data }: TAction<TStore>) => {
      navigate({ to: data?.id, search: { title: data?.name } });
   };

   return (
      <>
         <Header title="Вэб хуудасны жагсаалт" />
         <DataTable {...{ data, isLoading, columns, rowAction }} hideAction={true} />
      </>
   );
}

const columns: ColumnDef<TStore>[] = [
   {
      header: 'Вэбийн нэр',
      accessorKey: 'name',
      // size:500,
   },
   {
      header: 'Domain',
      accessorKey: 'domain',
      enableSorting: false,
   },
   {
      header: 'Вэбийн тайлбар',
      accessorKey: 'description',
      enableSorting: false,
      size: 400,
      // ellipsis:true
   },
   {
      header: 'Үүсгэсэн',
      accessorKey: "createdAt",
      enableSorting: false,
      cell:({ row })=> row.original.createdAt?.replace('T', " / ")?.slice(0, 18)
      // size: 400,
      // ellipsis:true
   },
];
