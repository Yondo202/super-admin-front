import { request } from '@/utils/connection/request';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { qKeys } from '@/utils/enums';

export type TPlan = {
   name: string;
   type: string;
};

type TQueryProps = {
   storeid:string
   enabled?:boolean
   keyId?: string | number
}

export type TStore = {
   name: string;
   description: string;
   domain: string;
   id: string;
   previewModeOn: boolean;
   createdAt: string;
   status: string;
   plan: TPlan;
};

export const storeQueryOptions = queryOptions({
   queryKey: [qKeys.stores],
   queryFn: () => request<TStore[]>({ mainUrl: import.meta.env.VITE_CONFIG_URL, url: 'web' }),
});

export const useStoreGetById = ({ idKey }: { idKey?: string }) => {
   return useQuery({
      queryKey: [qKeys.stores, idKey],
      queryFn: () => request<TStore>({ mainUrl: import.meta.env.VITE_CONFIG_URL, url: `web/${idKey}` }),
   });
};

export type TRolesData = {
   id: string;
   name: string;
   description: string;
   type: 'NORMAL' | 'SUPER';
   webid: string;
   permissions: TPermission[];
   isGenerated:boolean
};

type TRolesOption = {
   value:string
   label:string


   disable?: boolean;
   fixed?: boolean;
   [key: string]: string | boolean | undefined; // select option ii butets
} 


export type TUserData = {
   id?: string;
   lastName: string;
   firstName: string;
   createdAt: string;
   email: string;
   phoneNumber: string;
   roles:TRolesData[],
   roleIds: TRolesOption[]
};

export const useGetUsers = <TRequest>({ storeid, enabled, keyId }: TQueryProps) => {
   return useQuery({
      enabled: enabled,
      queryKey: [qKeys.users, keyId??`index`],
      queryFn: () => request<TRequest>({ url: `user${keyId?`/${keyId}`:``}?type=NORMAL`, webid: storeid }),
   });
};

export type TPermission = {
   name:string
   nameMon:string
   group:string
   description:string
   type:'NORMAL' | 'SUPER'
}

// {name: 'read-user', nameMon: 'List users', group: 'User', description: 'Self explaining', type: 'NORMAL'}
export const usePermissions = () => {
   return useQuery({
      // enabled:!disabled,
      queryKey: [qKeys.permission],
      queryFn: () => request<TPermission[]>({ url: `permission?type=NORMAL` }),
   })
}

export const useGetRoles = <TRequest>({ storeid, enabled, keyId }: TQueryProps) => {
   return useQuery({ enabled: enabled, queryKey: [qKeys.roles, keyId??'index'], queryFn: () => request<TRequest>({ url: `role${keyId?`/${keyId}`:``}?type=NORMAL`, webid: storeid }) });
};


