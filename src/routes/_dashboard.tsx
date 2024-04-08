import { Outlet, createFileRoute, redirect, useChildMatches, useRouterState } from '@tanstack/react-router';
import LeftMenu from '@/components/layout/LeftMenu';
import { BreadCrumb } from '@/components/custom'; 


export const Route = createFileRoute('/_dashboard')({
   beforeLoad: ({ context }) => {
      if (!context.isAuthenticated) {
         throw redirect({
            to: '/login',
         });
      }
   },
   component: RootComponent,
});

function RootComponent() {
   const childMatches = useChildMatches();
   const router = useRouterState();
   const breadcrumbs = childMatches.find((item) => (item.pathname?.charAt(item.pathname.length - 1) === '/' ? item.pathname?.slice(0, -1) : item.pathname) === router.location.pathname)
      ?.context.breadcrumbs;

   return (
      <div className="grid grid-cols-[260px_1fr]">
         <LeftMenu />
         <div className="pt-0 pl-10 pr-10 pb-12 h-dvh max-h-full overflow-y-auto">
            <BreadCrumb pathList={breadcrumbs??[]} />
            <Outlet />
         </div>
      </div>
   );
}
