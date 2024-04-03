import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
// import { type AuthContext } from '../core/auth'

interface MyRouterContext {
   isAuthenticated: boolean
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
   component: Outlet,
})
