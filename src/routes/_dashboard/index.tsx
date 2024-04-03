import { createFileRoute } from '@tanstack/react-router'
// import MainSector from '@/components/layout/MainSector'
import { request } from '@/utils/connection/request'
import { useQuery } from '@tanstack/react-query'
import { DataTable } from '@/components/custom'
import { ColumnDef } from '@tanstack/react-table' 


export const Route = createFileRoute('/_dashboard/')({
   component: () => <Dashboard />,
})

type TWeb = {
   name: string
   description: string
   domain: string
   id: string
   previewModeOn: boolean
}

function Dashboard() {
   const { data = [], isLoading } = useQuery({
      queryKey: ['webs'],
      queryFn: () => request<TWeb>({ mainUrl: import.meta.env.VITE_CONFIG_URL, url: '/web' }),
   })

   return (
      <div>
         <div className="pb-7 pt-7">
            <h3 className="text-xl font-medium">Вэб хуудасны жагсаалт</h3>
         </div>
         <DataTable {...{ data, isLoading, columns }} />
      </div>
   )
}

const columns: ColumnDef<TWeb>[] = [
  
   {
      header: 'Вэбийн нэр',
      accessorKey: 'name',
      // size:500,
   },
   {
      header: 'Domain',
      accessorKey: 'domain',
      enableSorting:false
   },
   {
      header: 'Вэбийн тайлбар',
      accessorKey: 'description',
      enableSorting:false,
      size:400,
      // ellipsis:true
   },
]
