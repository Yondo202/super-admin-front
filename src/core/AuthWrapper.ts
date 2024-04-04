import React, { useEffect } from 'react'
import { Amplify, type ResourcesConfig } from 'aws-amplify'
import { defaultStorage } from 'aws-amplify/utils'
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito'
import { getCurrentUser, signIn, type SignInInput, signOut, JWT, fetchAuthSession } from 'aws-amplify/auth'
import { create } from 'zustand'
import axios from 'axios'
import Notification from '@/utils/hooks/Notification'
// import { useQuery } from '@tanstack/react-query'

export const AwsConfigAuth: ResourcesConfig['Auth'] = {
   Cognito: {
      // region: import.meta.env.VITE_AUTH_REGION,
      userPoolId: import.meta.env.VITE_AUTH_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AUTH_USER_POOL_WEB_CLIENT_ID, // eniig olj tavi
      // userPoolWebClientId: import.meta.env.VITE_AUTH_USER_POOL_WEB_CLIENT_ID,
      // global:true,
      // cookieStorage: {
      //     domain: import.meta.env.VITE_AUTH_COOKIE_STORAGE_DOMAIN,
      //     // port:'',
      //     path: "/",
      //     expires: 365,
      //     sameSite: "lax",
      //     secure: import.meta.env.VITE_AUTH_COOKIE_STORAGE_SECURE,
      // },
      // authenticationFlowType: "USER_PASSWORD_AUTH",
   },
}

Amplify.configure({ Auth: AwsConfigAuth })
cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage)

type TState = { isLoading: boolean; isAuthenticated: boolean; user: null | undefined }

interface TAuthState extends TState {
   setAuthState: (state: TState) => void
   setInitial: () => void
}

export const useAuthState = create<TAuthState>((set) => {
   return {
      isAuthenticated: false,
      user: null,
      isLoading: true,
      setAuthState: (state) => set(state),
      setInitial: () => {
         // cookies.remove('jwt');
         return set({ isAuthenticated: false, user: null, isLoading: false })
      },
   }
})

export const useAuthCore = () => {
   const { setInitial, setAuthState } = useAuthState()

   async function handleSignOut() {
      try {
         await signOut()
         setInitial()
      } catch (error) {
         Notification('Хүсэлт амжилтгүй', 'error')
      }
   }

   // jwt: JWT | undefined
   const fetchMe = async (jwt: JWT | undefined) => {
      try {
         const userme = await axios.get(import.meta.env.VITE_AUTH_URL + 'user/me', { headers: { Authorization: `Bearer ${jwt}` } })
         // if (userme.data?.data.type !== 'SUPER') {
         //    // await signOut()
         //    Notification('Нэвтрэх боломжгүй хэрэглэгч байна!', 'error')
         //    return userme.data?.data
         // }

         if (userme?.data?.data) {
            setAuthState({ isAuthenticated: true, isLoading: false, user: userme?.data?.data })
         }
      } catch (err) {
         Notification('Дотоод сервертэй холбогдоход алдаа гарлаа', 'info')
      }
   }

   // const { data } = useQuery({
   //    queryKey: ['super-user/me'],
   //    queryFn: () => fetchMe(),
   //    // onSuccess: (resdata) => {
   //    //    console.log(resdata)
   //    // },
   // })

   // console.log(data, "--->")

   async function currentSession() {
      try {
         const { accessToken } = (await fetchAuthSession()).tokens ?? {}

         fetchMe(accessToken)
      } catch (error) {
         handleSignOut()
      }
   }

   async function checkAuth() {
      try {
         const { username } = await getCurrentUser()
         if (username) {
            currentSession()
         }
      } catch (error) {
         handleSignOut()
      }
   }

   async function handleSignIn({ username, password }: SignInInput) {
      try {
         const { isSignedIn } = await signIn({ username, password, options: { authFlowType: 'USER_PASSWORD_AUTH' } })

         if (isSignedIn) {
            window.location.reload()
            // currentSession()
         }
         return { success: true }
      } catch (error) {
         // Notification('Хүсэлт амжилтгүй', 'error')
         return { success: false, message: 'Нэвтрэх нэр эсвэл нууц үг буруу байна' }
      }
   }

   return { checkAuth, handleSignIn, handleSignOut }
}

const InitialWrapper = ({ children }: { children: React.ReactNode }) => {
   const { checkAuth } = useAuthCore()

   useEffect(() => {
      checkAuth()
   }, [])

   return children
}

export default InitialWrapper
