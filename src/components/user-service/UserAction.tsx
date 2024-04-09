import { TAction } from '@/utils/enums';
// import { TUserData } from './Roles';
import { useForm } from 'react-hook-form';
import { TextInput, Button, MultipleSelector, DeleteContent, Checkbox, Loading } from '@/components/custom'; //Textarea - daraa ni nem
import { MultipleSelectorRef } from '@/components/custom/MultiSelect';
import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { request, UseReFetch } from '@/utils/connection/request';
import { Empty } from '@/assets/svg'; 
import { qKeys } from '@/utils/enums';
import Notification from '@/utils/hooks/Notification';
import { type TUserData, useGetRoles, type TRolesData } from '@/utils/connection/queryOptions';
import Label from '@/components/ui/Label';
import { VscSend } from 'react-icons/vsc';

type TUserAction = {
   // daraa type uudiig neg bolgo
   select: TAction<TUserData>;
   setClose: ({ isDelete }: { isDelete?: boolean }) => void;
   storeid: string;
};

const UserAction = ({ select, storeid, setClose }: TUserAction) => {
   const selectRef = useRef<MultipleSelectorRef>(null);
   const { control, handleSubmit, reset, watch, setValue } = useForm<TUserData>({
      mode: 'onChange',
      defaultValues: { phoneNumber: '', roleIds: [] },
   });

   const { data: rolesData } = useGetRoles<TRolesData[]>({ storeid });

   const { mutate, isPending } = useMutation({
      mutationFn: (
         body: Omit<TUserData, 'action' | 'roleId' | 'roleIds' | 'isDelete'> & { roleIds?: string[] } & { isDelete?: boolean } & { action?: 'ADD' | 'REMOVE' } & { roleId?: string },
      ) =>
         request({
            url: select.type === 'add' ? `user/invite` : `user/${select.data?.id}`,
            body: body,
            //  method: 'post',
            method: body.isDelete ? 'delete' : select.type === 'add' ? 'post' : 'put',
            webid: storeid,
         }),
      onSuccess: (resdata) => {
         if (select.type !== 'edit') {
            setClose({ isDelete: false });
            UseReFetch({ queryKey: qKeys.users, queryId: 'index' });
            return;
         }

         reset({ ...resdata, roleIds: resdata?.roles?.map((item) => ({ value: item?.id, label: item.name ?? '' })) });
      },
   });

   useEffect(() => {
      if (select.type !== 'add') {
         reset({ ...select.data, roleIds: select.data?.roles?.map((item) => ({ value: item?.id, label: item.name ?? '' })) });
      }
   }, [select.isOpen]);

   const onSubmit = (data: TUserData) => {
      if (data.roleIds.length === 0) {
         Notification('Хэрэглэгчийн эрхийг сонгоно уу', 'error');
         selectRef?.current?.input.focus();
         return;
      }
      mutate({ ...data, roleIds: data.roleIds?.map((item) => item.value) });
   };

   if (select.type === 'delete') {
      return (
         <DeleteContent
            setClose={setClose}
            submitAction={() => mutate({ ...watch(), roleIds: watch().roleIds?.map((item) => item.value), isDelete: true })}
            isLoading={isPending}
            className="pb-6"
         />
      );
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="pb-6">
         {select.type === 'edit' && isPending ? <Loading inside load /> : null}

         <TextInput disabled={select.type !== 'add'} className="mb-6" control={control} rules={{ required: 'Утасны дугаар оруулна уу' }} name="phoneNumber" label="Утасны дугаар" />

         {select.type === 'add' ? (
            <div>
               <Label>Хэрэглэгчийн эрхүүд</Label>
               <MultipleSelector
                  value={watch()?.roleIds}
                  ref={selectRef}
                  onChange={(event) => setValue('roleIds', event)}
                  emptyIndicator={
                     <div className="flex h-24 w-full flex-col items-center justify-center gap-5">
                        <Empty className="dark:opacity-30" />
                        <div className="text-muted-text opacity-70">Мэдээлэл байхгүй байна</div>
                     </div>
                  }
                  // className="mb-6"
                  options={rolesData?.filter((item) => !item.isGenerated).map((item) => ({ label: item.name, value: item.id })) ?? []}
                  placeholder="Эрхүүд"
               />
            </div>
         ) : (
            <div className="mb-8">
               <div className="pb-6">
                  <div className="flex items-center gap-4">
                     <span className="text-muted-text">Хэрэглэгч:</span> {select.data?.lastName?.slice(0, 1)?.toLocaleUpperCase()}. {select.data?.firstName}
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="text-muted-text">Имэйл хаяг:</span> {select.data?.email}
                  </div>
               </div>
               <div className="text-muted-text text-md mb-3">Хэрэглэгчдийн эрхүүд</div>
               {rolesData
                  ?.filter((item) => !item.isGenerated)
                  ?.map((item, index) => {
                     return (
                        <div key={index} className="flex items-center gap-3 py-1 pl-2 h-max">
                           <Checkbox
                              id={item.id}
                              checked={watch().roleIds?.some((el) => el.value === item.id)}
                              onCheckedChange={(event) => {
                                 mutate({ ...watch(), roleIds: watch().roleIds?.map((item) => item.value), action: event ? 'ADD' : 'REMOVE', roleId: item.id });
                              }}
                           />
                           <label htmlFor={item.id} className="cursor-pointer select-none">
                              {item.name}
                           </label>
                        </div>
                     );
                  })}
            </div>
         )}

         {select.type === 'add' && (
            <div className="flex justify-end mt-8">
               <Button isLoading={isPending} type="submit">
                  <VscSend /> Илгээх
               </Button>
            </div>
         )}
      </form>
   );
};

export default UserAction;
