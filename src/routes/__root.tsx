import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
// import { LinkComponent } from '@tanstack/react-router';
// import { useRouter } from '@tanstack/react-router';
// import { type AuthContext } from '../core/auth'

export type TBreadCrumb = {
   title: string; // daraa enum aas av
   isActive?: boolean; // daraa enum aas av
   toLink: string;
};

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient;
   isAuthenticated: boolean;
   breadcrumbs?: TBreadCrumb[]; // yag type iin zow shaahguil bnlda
}>()({
   component: () => {
      return (
         <>
            <Outlet />
            <TanStackRouterDevtools />
            <ReactQueryDevtools buttonPosition="bottom-left" />
         </>
      );
   },
});