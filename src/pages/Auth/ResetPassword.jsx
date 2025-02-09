import {useDispatch, useSelector} from "react-redux"
import {selectPassword, setPassword} from "../../redux/features/loginSlice"
import {toast} from "react-toastify"
import {useNavigate} from "react-router"
import authServices from "../../services/authServices"

import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

const ResetPassword = () => {
  const password = useSelector(selectPassword)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleResetPassword = async e => {
    e.preventDefault()
    try {
      const response = await authServices.login({password})
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="w-[550px] mx-auto mt-20 p-12 shadow-xl border border-slate-100 rounded-sm bg-white">
      <div className="flex gap-14 flex-col">
        <div className="flex items-center justify-center flex-col gap-3">
          <div className="text-slate-900 font-semibold text-3xl">
            Reset Password
          </div>
          <span className="text-slate-500 text-lg">
            The password should have atleast 6 characters
          </span>
        </div>
        <form
          className="flex flex-col space-y-6"
          onSubmit={handleResetPassword}
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label className="text-slate-700">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter password"
                className="h-10"
                value={password}
                onChange={e => dispatch(setPassword(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-slate-700">Confirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                className="h-10"
                value={password}
                onChange={e => dispatch(setPassword(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              className="bg-slate-800 text-md font-semibold w-full"
              size="lg"
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
