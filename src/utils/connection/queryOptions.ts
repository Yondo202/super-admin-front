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

export type UserData = {
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
      queryFn: () => request<UserData[]>({ url: `user?type=NORMAL`, webid: idKey }),
   });
};
