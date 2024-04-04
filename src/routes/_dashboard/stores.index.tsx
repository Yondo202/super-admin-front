import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DataTable, Header } from "@/components/custom";
import { ColumnDef } from "@tanstack/react-table";
import { request } from "@/utils/connection/request";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_dashboard/stores/")({
  loader: async () =>
    request<TStore>({ mainUrl: import.meta.env.VITE_CONFIG_URL, url: "web" }),
  component: () => <Dashboard />,
});

export type TPlan = {
  name:string
  type:string
}

export type TStore = {
  name: string;
  description: string;
  domain: string;
  id: string;
  previewModeOn: boolean;
  createdAt: string;
  status: string;
  plan:TPlan
};

function Dashboard() {
  const navigate = useNavigate({ from: "/stores" });
  const { data = [], isLoading } = useQuery({
    queryKey: ["webs"],
    queryFn: () =>
      request<TStore[]>({
        mainUrl: import.meta.env.VITE_CONFIG_URL,
        url: "web",
      }),
  });

  const rowAction = ({ data }: TRowAction<TStore>) => {
    navigate({ to: data.id });
  };

  return (
    <>
      <Header title="Вэб хуудасны жагсаалт" />
      <DataTable {...{ data, isLoading, columns, rowAction }} />
    </>
  );
}

const columns: ColumnDef<TStore>[] = [
  {
    header: "Вэбийн нэр",
    accessorKey: "name",
    // size:500,
  },
  {
    header: "Domain",
    accessorKey: "domain",
    enableSorting: false,
  },
  {
    header: "Вэбийн тайлбар",
    accessorKey: "description",
    enableSorting: false,
    size: 400,
    // ellipsis:true
  },
];
