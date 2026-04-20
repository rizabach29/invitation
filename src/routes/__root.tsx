import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useLenis } from '../lib/useLenis'

export const Route = createRootRoute({
  component: () => {
    useLenis()
    return (
      <div className="min-h-screen bg-cream">
        <Outlet />
      </div>
    )
  },
})
