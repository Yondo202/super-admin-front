import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Header, Skeleton, Badge, Button, Dialog, DeleteContent } from '@/components/custom';
import { useStoreGetById } from '@/utils/connection/queryOptions';
import Users from '@/components/user-service/Users';
import Roles from '@/components/user-service/Roles';
import { GoTrash } from 'react-icons/go';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { request } from '@/utils/connection/request';
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
   const navigate = useNavigate();
   const [isOpen, setIsOpen] = useState(false);
   const { storeid } = Route.useParams();
   const { data, isLoading, isSuccess } = useStoreGetById({ idKey: storeid });

   const { mutate, isPending } = useMutation({
      mutationFn: () => request({ url: `web/${storeid}`, mainUrl: import.meta.env.VITE_CONFIG_URL, method: 'delete' }),
      onSuccess: () => {
         navigate({ to: '/' });
      },
   });

   const DeleteSubmit = () => {
      mutate();
   };

   return (
      <div>
         <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
            <DeleteContent isLoading={isPending} submitAction={DeleteSubmit} setClose={() => setIsOpen(false)} />
         </Dialog>
         <div className="grid grid-cols-[1fr_300px] gap-8">
            {isLoading ? (
               <>
                  <Skeleton className="h-96" />
                  <Skeleton />
               </>
            ) : (
               <>
                  <div className="flex flex-col gap-6">
                     <div>
                        <Header title="Хэрэглэгчид" />
                        <Users isSuccess={isSuccess} storeid={storeid} />
                     </div>
                     <div>
                        <Header title="Хэрэглэгчийн эрхүүд" />
                        <Roles isSuccess={isSuccess} storeid={storeid} />
                     </div>
                  </div>

                  <div className="wrapper pb-5 h-fit sticky top-8">
                     <div className="p-5 mb-5 border-b grid items-center gap-3 grid-cols-[60%_1fr]">
                        <div className="one_line text-base font-medium">{data?.name}</div>
                        <Button onClick={() => setIsOpen(true)} size="sm" variant="destructive">
                           <GoTrash /> Устгах
                        </Button>
                     </div>
                     {/* <div className="flex gap-3.5 align-center mb-4">
                        <div className="text-muted-text">Нэр:</div>
                        <div>{data?.name}</div>
                     </div> */}
                     <div className="flex gap-3.5 align-center px-5 mb-4">
                        <div className="text-muted-text">Домайн:</div>
                        <div>{data?.domain}</div>
                     </div>
                     <div className="flex gap-3.5 align-center px-5 mb-4">
                        <div className="text-muted-text">Үүсгэсэн:</div>
                        <div>{data?.createdAt?.slice(0, 10)}</div>
                     </div>
                     {data?.status && (
                        <div className="flex gap-3.5 align-center px-5 mb-4">
                           <div className="text-muted-text text-xs">Төлөв:</div>
                           <Badge variant="secondary">{data?.status}</Badge>
                        </div>
                     )}
                     <div className="flex gap-3.5 align-center px-5 mb-4 ">
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
