import { createFileRoute } from '@tanstack/react-router';
import { Header, Skeleton, Badge } from '@/components/custom';
import { useStoreGetById } from '@/utils/connection/queryOptions';
import Users from '@/components/user-service/Users';
import Roles from '@/components/user-service/Roles';

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

   // const context = Route.useRouteContext()
   // console.log(context, "-------------->context")

   return (
      <div>
         <div className="grid grid-cols-[1fr_340px] gap-8">
            {isLoading ? (
               <>
                  <Skeleton className="h-96" />
                  <Skeleton />
               </>
            ) : (
               <>
                  <div>
                     <Header title="Хэрэглэгчид" />
                     <Users isSuccess={isSuccess} storeid={storeid} />
                     <Header title="Хэрэглэгчийн эрхүүд" />
                     <Roles isSuccess={isSuccess} storeid={storeid} />
                  </div>

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
