import { createFileRoute } from "@tanstack/react-router";
import {
  Header,
  Skeleton,
  DataTable,
  Badge,
  Button,
} from "@/components/custom";
import { request } from "@/utils/connection/request";
import { useQuery } from "@tanstack/react-query";
import { TStore } from "./stores.index";
import { ColumnDef } from "@tanstack/react-table";
import { IoAdd } from "react-icons/io5";


export const Route = createFileRoute("/_dashboard/stores/$storeid")({
  component: StoreComponent,
});

type UserData = {
  lastName: string;
  firstName: string;
  createdAt: string;
  email: string;
  phoneNumber: string;
};

function StoreComponent() {
  const { storeid } = Route.useParams();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["webs", storeid],
    queryFn: () =>
      request<TStore>({
        mainUrl: import.meta.env.VITE_CONFIG_URL,
        url: `web/${storeid}`,
      }),
  });

  const { data: usersData, isLoading: userLoading } = useQuery({
    enabled: isSuccess,
    queryKey: ["users", storeid],
    queryFn: () =>
      request<UserData[]>({ url: `user?type=NORMAL`, webid: storeid }),
  });

  // console.log(data, "---------> web data");
  // console.log(usersData, "---------> usersData");

  return (
    <div>
      <Header title={data?.name} />

      <div className="grid grid-cols-[1fr_340px] gap-5">
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
              headAction={<Button size="sm" variant="outline"><IoAdd className="text-base" /> Нэмэх</Button>}
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
                  <div className="text-muted-text">Төлөв:</div>
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
    header: "Нэр",
    accessorKey: "firstName",
    cell: ({ row }) =>
      `${row.original.lastName?.slice(0, 1)}. ${row.original.firstName}`,
  },
  {
    header: "И-мэйл",
    accessorKey: "email",
  },
  {
    header: "Дугаар",
    accessorKey: "phoneNumber",
  },
  {
    header: "Үүсгэсэн",
    accessorKey: "createdAt",
    cell: ({ row }) =>
      `${row.original.createdAt.slice?.(0, 10)}`,
  },
];
