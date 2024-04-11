import { useState, useEffect } from 'react';
import { initalAction } from '@/utils/enums';
import { useForm } from 'react-hook-form';
import { type TActionProps, type TAction } from '@/utils/connection/sharedTypes';
import { MdAdd } from 'react-icons/md';
import { DataTable, Checkbox, Dialog, Button, TextInput, SelectInput, DeleteContent } from '@/components/custom';
import { request, UseReFetch, type TRequest } from '@/utils/connection/request';
import { qKeys, validEmail } from '@/utils/enums';
import { ColumnDef } from '@tanstack/react-table';
import { useQuery, useMutation } from '@tanstack/react-query';

const provider = ['smtp', 'sendgrid'] as const;

type ProviderType = (typeof provider)[keyof typeof provider];

type TEmailCredential = {
   id: string;
   provider: ProviderType;
   api_key: string;
   smtp_username: string;
   smtp_password: string;
   smtp_host: string;
   smtp_port: number;
   from_address: string;
   from_name: string;
   reply_to_address: string;
   reply_to_name: string;
   is_default: 'true' | 'false';
};

const initial: Omit<TEmailCredential, 'id'> = {
   provider: 'sendgrid',
   is_default: 'true',
   api_key: '',
   smtp_username: '',
   smtp_password: '',
   smtp_host: '',
   smtp_port: 0,
   from_address: '',
   from_name: '',
   reply_to_address: '',
   reply_to_name: '',
};

const EmailConfig = () => {
   const [select, setSetSelect] = useState(initalAction<TEmailCredential>());
   const { data = [], isLoading } = useQuery({
      queryKey: [qKeys.email_credential],
      queryFn: () => request<TEmailCredential[]>({ mainUrl: import.meta.env.VITE_URL_NOTIFICATION, url: 'email-credential', webid: 'system' }),
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

         <Dialog className="w-[600px] overflow-visible" title="Е-Мэйл" isOpen={select.isOpen} onOpenChange={(e) => setSetSelect({ type: 'add', isOpen: e })}>
            <Action select={select} setClose={setClose} />
         </Dialog>
      </>
   );
};

export default EmailConfig;

const Action = ({ select, setClose }: Omit<TActionProps<TEmailCredential>, 'storeid'>) => {
   const { control, handleSubmit, reset, watch } = useForm<TEmailCredential>({ mode: 'onChange', defaultValues: initial });

   const { mutate, isPending } = useMutation({
      mutationFn: (body: { data: TEmailCredential; method: TRequest<TEmailCredential>['method'] }) =>
         request({
            mainUrl: import.meta.env.VITE_URL_NOTIFICATION,
            method: body.method,
            body: { ...body.data, smtp_port: +body.data.smtp_port, is_default: body.data.is_default === 'true' },
            url: `email-credential${select.type !== 'add' ? `/${select.data?.id}` : ''}`,
            webid: 'system',
         }),
      onSuccess: () => {
         setClose({});
         UseReFetch({ queryKey: qKeys.email_credential });
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
      <form onSubmit={handleSubmit(onSubmit)} className="pb-6 flex flex-col gap-6">
         <div className="grid grid-cols-[1fr_1fr] gap-4">
            <SelectInput
               name="provider"
               label="Э-мэйл үйлчилгээний нэр"
               control={control}
               // defaultValue={provider.at(0)}
               rules={{ required: true }}
               options={provider.map((p) => ({ label: p.toUpperCase(), value: p }))}
            />
            <SelectInput
               name="is_default"
               label="Үндсэн"
               // defaultValue="true"
               control={control}
               rules={{ required: true }}
               options={[
                  { label: 'Тийм', value: 'true' },
                  { label: 'Үгүй', value: 'false' },
               ]}
            />
         </div>
         <div className="grid grid-cols-[1fr_1fr] gap-6">
            <TextInput name="smtp_username" label="SMTP - Хэрэглэгчийн нэр" rules={{ required: true }} control={control} />
            <TextInput name="smtp_password" label="SMTP - Нууц үг" rules={{ required: true }} control={control} />
         </div>

         <div className="grid grid-cols-[1fr_1fr] gap-6">
            <TextInput name="smtp_host" label="SMTP Host" rules={{ required: true }} control={control} />
            <TextInput name="smtp_port" label="SMTP Port" type="number" rules={{ required: true }} control={control} />
         </div>
         <div className="grid grid-cols-[1fr_1fr] gap-6">
            <TextInput name="from_address" label="Илгээгчийн хаяг" rules={{ required: true, ...validEmail }} control={control} />
            <TextInput name="from_name" label="Илгээгчийн нэр" rules={{ required: true }} control={control} />
         </div>

         <div className="grid grid-cols-[1fr_1fr] gap-6">
            <TextInput name="reply_to_address" label="Хариу илгээх хаяг" rules={{ required: true, ...validEmail }} control={control} />
            <TextInput name="reply_to_name" label="Хариу илгээх нэр" rules={{ required: true }} control={control} />
         </div>

         <div className="grid grid-cols-[1fr_1fr] gap-6">
            <TextInput name="api_key" label="API Key" rules={{ required: true }} control={control} />
         </div>
         <div className="flex justify-end">
            <Button type="submit" isLoading={isPending}>
               Хадгалах
            </Button>
         </div>
      </form>
   );
};

const columnDef: ColumnDef<TEmailCredential>[] = [
   {
      header: 'Үндсэн',
      accessorKey: 'is_default',
      cell: ({ row }) => <Checkbox checked={row.original.is_default.toString() === "true"} />,
      enableSorting: false,
   },
   {
      header: 'Э-мэйл үйлчилгээний нэр',
      accessorKey: 'provider',
   },
   // {
   //    header: 'API Key',
   //    accessorKey: 'api_key',
   // },
   {
      header: 'Хэрэглэгчийн нэр',
      accessorKey: 'smtp_username',
   },
   // {
   //    header: 'SMTP Password',
   //    accessorKey: 'smtp_password',
   // },
   // {
   //    header: 'SMTP Host',
   //    accessorKey: 'smtp_host',
   // },
   // {
   //    header: 'SMTP Port',
   //    accessorKey: 'smtp_port',
   // },
   {
      header: 'Илгээгчийн хаяг',
      accessorKey: 'from_address',
   },
   {
      header: 'Илгээгчийн нэр',
      accessorKey: 'from_name',
   },
];
