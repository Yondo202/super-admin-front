import { ThemeProvider, useTheme } from '@/core/theme-provider'
// import App from "./App.tsx";
import { routeTree } from './routeTree.gen'
import { RouterProvider, createRouter } from '@tanstack/react-router'
// import { AuthProvider, useAuth } from './core/auth'
import InitialWrapper, { useAuthState } from './core/AuthWrapper'
import { Toaster } from 'sonner'
import { Loading } from '@/components/ui'
import { Moon, Sun } from 'lucide-react'

const router = createRouter({
   routeTree,
   defaultPreload: 'intent',
   context: {
      isAuthenticated: undefined!, // This will be set after we wrap the app in an AuthProvider
   },
})

declare module '@tanstack/react-router' {
   interface Register {
      router: typeof router
   }
}

function App() {
   const { isAuthenticated, isLoading } = useAuthState()

   return (
      <>
         <Toaster
         // {...getToastSettings()}
         // toastOptions={{
         //    style: { background: `${darkMode ? `${getThemeSettings(darkMode).boxBackground}` : `#fff`}` },
         // }}
         // theme={darkMode ? `dark` : `light`}
         // closeButton
         />
         <InitialWrapper>
            <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
               {isLoading ? <Loading load /> : <RouterProvider router={router} context={{ isAuthenticated: isAuthenticated }} />}
               <SwitchDarkMode />
               {/* <BackgroundBeams /> */}
            </ThemeProvider>
         </InitialWrapper>
      </>
   )
}

export default App

const SwitchDarkMode = () => {
   const { setTheme, theme } = useTheme()

   return (
      <div className="fixed bottom-8 right-8 cursor-pointer rounded-full border border-muted-border bg-card-bg p-2">
         {theme === 'dark' ? (
            <Sun strokeWidth={1.4} className="w-5 h-5 text-muted-text" onClick={() => setTheme('light')} />
         ) : (
            <Moon strokeWidth={1.4} className="w-5 h-5 text-muted-text" onClick={() => setTheme('dark')} />
         )}
      </div>
   )
}
