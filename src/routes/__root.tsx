import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
// import { type AuthContext } from '../core/auth'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  isAuthenticated: boolean;
}>()({
  component: Outlet,
});
