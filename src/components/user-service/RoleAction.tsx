import { useForm } from 'react-hook-form';
import { TextInput, Skeleton, Checkbox, Button, DeleteContent } from '@/components/custom'; //Textarea - daraa ni nem
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { request, UseReFetch } from '@/utils/connection/request';
import { qKeys } from '@/utils/enums';
import { usePermissions, type TRolesData, useGetRoles } from '@/utils/connection/queryOptions';

import { type TActionProps } from '@/utils/connection/sharedTypes';

const RoleAction = ({ select, storeid, setClose }: TActionProps<TRolesData>) => {
   const { control, handleSubmit, reset, setValue, watch } = useForm<TRolesData>({ mode: 'onChange', defaultValues: { name: '', description: '', permissions: [] } });

   const { isLoading, data, isSuccess, dataUpdatedAt } = useGetRoles<TRolesData>({ storeid, enabled: !!select.data?.id, keyId:select.data?.id });

   const { mutate, isPending } = useMutation({
      mutationFn: (body: Omit<TRolesData, 'permissions' | 'isDelete'> & { permissions: string[] } & { isDelete?: boolean }) =>
         request({
            body: body,
            url: `role${select.type !== 'add' ? `/${select.data?.id}` : ``}?type=NORMAL`,
            webid: storeid,
            method: body.isDelete ? 'delete' : select.type === 'add' ? 'post' : 'put',
         }),
      onSuccess: () => {
         setClose({ isDelete: false });
         UseReFetch({ queryKey: qKeys.roles, queryId: 'index' });
      },
   });

   const { data: permissions = [] } = usePermissions();

   useEffect(() => {
      if (select.type !== 'add' && isSuccess) {
         reset(data ?? {});
      }
   }, [dataUpdatedAt, isSuccess]);

   const onSubmit = (data: TRolesData) => {
      mutate({ ...data, type: 'NORMAL', permissions: data.permissions.map((item) => item.name) });
   };

   const group = Object.groupBy(
      permissions?.filter((item) => item.type !== 'SUPER'),
      ({ group }) => group,
   );

   if (select.type === 'delete') {
      return (
         <DeleteContent
            setClose={setClose}
            submitAction={() => mutate({ ...watch(), type: 'NORMAL', permissions: watch().permissions.map((item) => item.name), isDelete: true })}
            isLoading={isPending}
            className="pb-6"
         />
      );
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid grid-cols-[40%_1fr] gap-5 mb-5">
            {isLoading ? (
               <>
                  <Skeleton className="h-9" />
                  <Skeleton className="h-9" />
               </>
            ) : (
               <>
                  <TextInput control={control} rules={{ required: 'Нэр оруулна уу' }} name="name" label="Нэр" />
                  <TextInput control={control} rules={{ required: 'Тайлбар оруулна уу' }} name="description" label="Тайлбар" />
               </>
            )}
         </div>
         {isLoading ? (
            <div className="pb-6 w-full">
               <Skeleton className="h-52 w-full" />
            </div>
         ) : (
            <div className="pb-6">
               {Object.keys(group)?.map((element, index) => {
                  return (
                     <div key={index}>
                        <div className="pb-1 pt-3.5 text-muted-text">{element}</div>
                        {group?.[element]?.map((item, ind) => {
                           return (
                              <div key={ind} className="flex items-center gap-3 py-1 pl-2 h-max">
                                 <Checkbox
                                    id={item.name}
                                    checked={watch().permissions?.some((el) => el.name === item.name)}
                                    onCheckedChange={() => {
                                       setValue(
                                          'permissions',
                                          watch().permissions?.some((el) => el.name === item.name)
                                             ? [...watch().permissions.filter((s) => s.name !== item.name)]
                                             : [...watch().permissions, item],
                                       );
                                    }}
                                 />
                                 <label htmlFor={item.name} className="cursor-pointer select-none">
                                    {item.nameMon}
                                 </label>
                              </div>
                           );
                        })}
                     </div>
                  );
               })}
            </div>
         )}

         <div className="dialog-footer">
            <Button isLoading={isPending} type="submit">
               Хадгалах
            </Button>
         </div>
      </form>
   );
};

export default RoleAction;
