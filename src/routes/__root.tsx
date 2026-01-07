import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { Navbar } from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const RootLayout = () => (
  <>
    <Navbar/>
    <Outlet />
    <Footer/>
    <Toaster
      position="top-right"
      offset={110}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'font-inter',
        },
      }}
    />
  </>
)

export const Route = createRootRoute({ component: RootLayout })