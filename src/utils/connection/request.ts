// import { queryClient } from "@/main";
import axios from 'axios';
import Notification from '@/utils/hooks/Notification';
import { fetchAuthSession } from 'aws-amplify/auth';
import { queryClient } from '@/App';

export type TRequest<T> = {
   method?: 'get' | 'post' | 'put' | 'delete';
   url?: string;
   mainUrl?: string;
   body?: T;
   webid?: string;
};

type ResponseType<T> = {
   data?: T;
};

export const getJwt = () => {
   return document.cookie
      ?.split('; ')
      ?.find((row) => row.startsWith('jwt='))
      ?.split('=')[1];
};

export const request = async <T>({ mainUrl, url = '', method = 'get', body = undefined, webid }: TRequest<T>) => {
   const { accessToken } = (await fetchAuthSession()).tokens ?? {};
   // const User = await Auth.currentAuthenticatedUser()
   // const jwt = User?.signInUserSession?.accessToken?.jwtToken
   // if (!jwt) {
   //     await Auth.signOut()
   //     window.location.reload();
   //     Notification('Дахин нэвтэрнэ үү', 'error')
   //     return
   // }

   const token = { headers: { Authorization: `Bearer ${accessToken}`, webid: webid } };
   const fullUrl = `${mainUrl ?? import.meta.env.VITE_AUTH_URL}${url}`;

   try {
      const response = await axios<ResponseType<T>>({ url: fullUrl, method: method, data: body ?? {}, headers: token.headers });
      if (method !== 'get') {
         Notification('Хүсэлт амжилттай', 'success');
      }

      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (err: any) {
      if (err?.response?.data?.message) {
         Notification(err?.response?.data?.message, 'error');
         throw err;
      }
      Notification('Хүсэлт амжилтгүй', 'error');
   }
};

type TRefetch = {
   queryKey: string;
   queryId?: string;
};

export const UseReFetch = ({ queryKey, queryId }: TRefetch) => {
   queryClient.refetchQueries({ queryKey: [queryKey, queryId ?? undefined] });
   // messageAlert('Хүсэлт амжилттай')
};
