import {Link} from "react-router-dom"

const AuthNavbar = () => {
  return (
    <div className="items-center px-4 mx-auto md:flex md:px-8 justify-between">
      <div className="flex items-center justify-between py-3 md:py-5 md:block">
        <Link to="/auth/login" className="cursor-pointer">
          <div className="flex flex-col items-center">
            <p className="text-slate-700 text-xs font-medium">Finance</p>
            <p className="text-xl leading-none font-bold text-orange-500">
              Manager
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AuthNavbar
