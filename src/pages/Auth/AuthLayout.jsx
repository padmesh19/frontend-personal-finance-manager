import {Outlet} from "react-router-dom"

import AuthNavbar from "@/components/AuthNavbar"

const AuthLayout = () => {
  return (
    <div className="h-screen bg-[#f5f5f5]">
      <AuthNavbar />
      <Outlet />
    </div>
  )
}

export default AuthLayout
