// import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
// import BackgroundBeams from '@/lib/BgBeams'
// import { type AuthContext } from '../core/auth'

// interface MyRouterContext {
//    isAuthenticated: boolean
// }

// export const Route = createRootRouteWithContext<MyRouterContext>()({
// // export const Route = createRootRouteWithContext()({
//    component: RootComponent,
// })
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import LeftMenu from "@/components/layout/LeftMenu";

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="grid grid-cols-[260px_1fr]">
      <LeftMenu />
      <div className="pt-0 pl-10 pr-10 pb-10 h-dvh max-h-full overflow-y-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  );
}
