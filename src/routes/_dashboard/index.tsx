import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/")({
  beforeLoad: () => {
    throw redirect({ to: "/stores" });
  },
  component: () => <Outlet />
});

// function Dashboard() {
//   return <div>home</div>;
// }