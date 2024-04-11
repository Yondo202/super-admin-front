import { useState, useEffect } from 'react';
import { initalAction } from '@/utils/enums';
import { useForm } from 'react-hook-form';
import { type TActionProps, type TAction } from '@/utils/connection/sharedTypes';
import { MdAdd } from 'react-icons/md';
import { DataTable, Dialog, Button, TextInput, SelectInput, DeleteContent } from '@/components/custom';
import { request, UseReFetch, type TRequest } from '@/utils/connection/request';
import { qKeys } from '@/utils/enums';
import { useQuery, useMutation } from '@tanstack/react-query';

const provider = ['mobicom', 'unitel', 'skytel', 'gmobile', 'messagepro'] as const;

type ProviderType = (typeof provider)[keyof typeof provider];

type TEmailCredential = {
   id: string;
   provider: ProviderType;
   username: string;
   password: string;
   from: string;
};

const initial: Omit<TEmailCredential, 'id'> = {
   provider: 'mobicom',
   username: '',
   password: '',
   from: '',
};

const MessegeConfig = () => {
   const [select, setSetSelect] = useState(initalAction<TEmailCredential>());
   const { data = [], isLoading } = useQuery({
      queryKey: [qKeys.sms_credential],
      queryFn: () => request<TEmailCredential[]>({ mainUrl: import.meta.env.VITE_URL_NOTIFICATION, url: 'sms-credential', webid: 'system' }),
   });
   const rowAction = (props: TAction<TEmailCredential>) => {
      setSetSelect(props);
   };
   const setClose = ({ isDelete }: { isDelete?: boolean }) => {
      setSetSelect({ isOpen: false, type: isDelete ? 'delete' : 'add' });
   };

   return (
      <>
         <DataTable
            headAction={
               <Button size="sm" variant="outline" className="rounded-full" onClick={() => setSetSelect({ isOpen: true, type: 'add' })}>
                  <MdAdd /> Хэрэглэгч урих
               </Button>
            }
            rowAction={rowAction}
            data={data ?? []}
            isLoading={isLoading}
            columns={columnDef}
         />

         <Dialog className="w-[500px] overflow-visible" title="Мессеж" isOpen={select.isOpen} onOpenChange={(e) => setSetSelect({ type: 'add', isOpen: e })}>
            <Action select={select} setClose={setClose} />
         </Dialog>
      </>
   );
};

export default MessegeConfig;

const Action = ({ select, setClose }: Omit<TActionProps<TEmailCredential>, 'storeid'>) => {
   const { control, handleSubmit, reset, watch } = useForm<TEmailCredential>({ mode: 'onChange', defaultValues: initial });

   const { mutate, isPending } = useMutation({
      mutationFn: (body: { data: TEmailCredential; method: TRequest<TEmailCredential>['method'] }) =>
         request({
            mainUrl: import.meta.env.VITE_URL_NOTIFICATION,
            method: body.method,
            body: body.data,
            url: `sms-credential${select.type !== 'add' ? `/${select.data?.id}` : ''}`,
            webid: 'system',
         }),
      onSuccess: () => {
         setClose({});
         UseReFetch({ queryKey: qKeys.sms_credential });
      },
   });

   useEffect(() => {
      if (select.type !== 'add') {
         reset(select.data);
      }
   }, [select.isOpen]);

   const onSubmit = (data: TEmailCredential) => {
      mutate({ data, method: select.type !== 'add' ? 'put' : 'post' });
   };

   if (select.type === 'delete') {
      return <DeleteContent setClose={setClose} submitAction={() => mutate({ data: watch(), method: 'delete' })} isLoading={isPending} className="pb-6" />;
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="pb-6 flex flex-col gap-7">
        <SelectInput name="provider" label="SMS провайдер" control={control} rules={{ required: true }} options={provider.map((p) => ({ label: p.toUpperCase(), value: p }))} />
        <TextInput placeholder="99801406" name="from" label="SMS илгээх дугаар" rules={{ required: true }} control={control} />

        
         <div className="grid grid-cols-[1fr_1fr] gap-6">
            <TextInput name="username" label="Нэр" placeholder="SMS API-н нэвтрэх нэр" rules={{ required: true }} control={control} />
            <TextInput name="password" label="Нууц үг" placeholder="SMS API-н нууц үг" rules={{ required: true }} control={control} />
         </div>

         <div className="flex justify-end py-2">
            <Button type="submit" isLoading={isPending}>
               Хадгалах
            </Button>
         </div>
      </form>
   );
};

const columnDef = [
   {
      header: 'SMS провайдер',
      accessorKey: 'provider',
   },
   {
      header: 'SMS илгээх дугаар',
      accessorKey: 'from',
   },
   {
      header: 'SMS API-н нэвтрэх нэр',
      accessorKey: 'username',
   },
];
