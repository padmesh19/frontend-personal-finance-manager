import {useDispatch, useSelector} from "react-redux"
import {
  selectEmail,
  setEmail,
  setPassword,
} from "../../redux/features/loginSlice"
import {toast} from "react-toastify"
import {Link, useNavigate} from "react-router"
import authServices from "../../services/authServices"
import {setUser} from "../../redux/features/userSlice"
import {fetchBudget} from "@/redux/features/budgetSlice"
import {fetchCategory} from "@/redux/features/categorySlice"
import {fetchTransaction} from "@/redux/features/transactionSlice"
import {fetchGoal} from "@/redux/features/goalSlice"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useState} from "react"
import {Mail} from "lucide-react"

const ForgotPassword = () => {
  const email = useSelector(selectEmail)

  const [isEmailSent, setIsEmailSent] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleForgotPassword = async e => {
    e.preventDefault()
    try {
      const response = await authServices.login({email})

      if (response.status === 200) {
        setIsEmailSent(true)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      {!isEmailSent ? (
        <div className="w-[550px] mx-auto mt-20 p-12 shadow-xl border border-slate-100 rounded-sm bg-white">
          <div className="flex gap-14 flex-col">
            <div className="flex items-center justify-center flex-col gap-3">
              <div className="text-slate-900 font-semibold text-3xl">
                Forgot Password?
              </div>
              <span className="text-slate-500 text-lg">
                No worries we will send you a reset instructions
              </span>
            </div>
            <form
              className="flex flex-col space-y-6"
              onSubmit={handleForgotPassword}
            >
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <Label className="text-slate-700">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    className="h-10"
                    value={email}
                    onChange={e => dispatch(setEmail(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  className="bg-slate-800 text-md font-semibold w-full"
                  size="lg"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-[550px] mx-auto mt-20 p-12 shadow-xl border border-slate-100 rounded-sm bg-white flex flex-col gap-6">
          <div className="flex gap-2 flex-col items-center justify-center">
            <Mail color="orange" size={80} />
            <div className="text-slate-800 text-2xl font-semibold mt-5">
              Check you Inbox
            </div>
            <div className="text-slate-600 text-lg text-center mt-2">
              We have sent you a OTP and a verification link to reset your
              password. Please check your inbox and click the verficaion link.
            </div>
          </div>
          <div className="flex justify-between items-center mt-5 w-full">
            <Link
              to="/auth/login"
              className="text-sm font-semibold bg-slate-800 p-2 px-3 text-white w-full text-center rounded-sm"
            >
              Go back to Sign In
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default ForgotPassword
