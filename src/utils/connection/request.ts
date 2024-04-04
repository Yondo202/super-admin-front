// import { queryClient } from "@/main";
import axios from 'axios'
import Notification from '@/utils/hooks/Notification'
import { fetchAuthSession } from 'aws-amplify/auth'

type Request = {
   method?: 'get' | 'post' | 'put' | 'post'
   url?: string
   mainUrl?: string
   body?: object
   webid?: string
}

type ResponseType<T> = {
   data?: T
}

export const getJwt = () => {
   return document.cookie
      ?.split('; ')
      ?.find((row) => row.startsWith('jwt='))
      ?.split('=')[1]
}

export const request = async <T>({ mainUrl, url = '', method = 'get', body = {}, webid }: Request) => {
   const { accessToken } = (await fetchAuthSession()).tokens ?? {}
   // const User = await Auth.currentAuthenticatedUser()
   // const jwt = User?.signInUserSession?.accessToken?.jwtToken
   // if (!jwt) {
   //     await Auth.signOut()
   //     window.location.reload();
   //     Notification('Дахин нэвтэрнэ үү', 'error')
   //     return
   // }

   const token = { headers: { Authorization: `Bearer ${accessToken}`, webid:webid } }
   const fullUrl = `${mainUrl ?? import.meta.env.VITE_AUTH_URL}${url}`

   try {
      const response = await axios<ResponseType<T>>({ url: fullUrl, method: method, data: body ?? {}, headers: token.headers })
      return response.data.data
   } catch (err) {
      Notification('Хүсэлт амжилтгүй', 'error')
      throw err
   }
}
