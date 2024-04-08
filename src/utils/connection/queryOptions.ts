import { request } from '@/utils/connection/request';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { qKeys } from '@/utils/enums';

export type TPlan = {
   name: string;
   type: string;
};

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

export type TUserData = {
   lastName: string;
   firstName: string;
   createdAt: string;
   email: string;
   phoneNumber: string;
};

export const useGetUsers = ({ idKey, enabled }: { idKey?: string; enabled?: boolean }) => {
   return useQuery({
      enabled: enabled,
      queryKey: [qKeys.users],
      queryFn: () => request<TUserData[]>({ url: `user?type=NORMAL`, webid: idKey }),
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
