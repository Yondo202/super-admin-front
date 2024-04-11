import { ThemeProvider, useTheme } from "@/core/theme-provider";
// import App from "./App.tsx";
import { routeTree } from "./routeTree.gen";
import { RouterProvider, createRouter } from "@tanstack/react-router";
// import { AuthProvider, useAuth } from './core/auth'
import InitialWrapper, { useAuthState } from "./core/AuthWrapper";
import { Toaster } from "sonner";
import { DashboardSkeleton } from "@/components/ui";
import { GoMoon, GoSun } from "react-icons/go";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Notification from "./utils/hooks/Notification";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect:true,
    },
  },
  // queryCache:new QueryCache({
  //   onError: (error) => {
  //     toast(`Something went wrong: ${error.message}`),
  //   }
  // }),
});

const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClient,
    isAuthenticated: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const { isAuthenticated, isLoading } = useAuthState()

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        richColors
        // {...getToastSettings()}
        // toastOptions={{
        //    style: { background: `${darkMode ? `${getThemeSettings(darkMode).boxBackground}` : `#fff`}` },
        // }}
        // theme={darkMode ? `dark` : `light`}
        // closeButton
      />
      <InitialWrapper>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <RouterProvider
              router={router}
              context={{ isAuthenticated: isAuthenticated }}
            />
          )}
          <SwitchDarkMode />
          {/* <BackgroundBeams /> */}
        </ThemeProvider>
      </InitialWrapper>

     
      
    </QueryClientProvider>
  );
}

export default App;

const SwitchDarkMode = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="fixed bottom-8 right-8 cursor-pointer rounded-full border border-muted-border bg-card-bg p-2">
      {theme === "dark" ? (
        <GoSun
          className="w-5 h-5 text-muted-text"
          onClick={() => setTheme("light")}
        />
      ) : (
        <GoMoon
          className="w-5 h-5 text-muted-text"
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  );
};
