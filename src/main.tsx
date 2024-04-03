import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 0,
         refetchOnWindowFocus: false,
      },
   },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <App />
      </QueryClientProvider>
   </React.StrictMode>,
)