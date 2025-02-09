import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from "react"
import {Pencil, Trash2, Plus, Loader2} from "lucide-react"
import {Button} from "@/components/ui/button"
import BudgetForm from "./budgetForm"
import BudgetDelete from "./budgetDelete"
import AddBudgetForm from "./AddBudgetForm"
import {useDispatch, useSelector} from "react-redux"
import {fetchBudget} from "../../redux/features/budgetSlice"

export default function BudgetList() {
  const dispatch = useDispatch()
  const {budgets, isLoading, error} = useSelector(state => state.budget)
  const [isOpen, setIsOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [data, setData] = useState(null)

  const toggle = () => {
    setIsOpen(!isOpen)
    setData(null)
  }

  const deleteToggle = () => {
    setIsDeleteOpen(!isDeleteOpen)
    setData(null)
  }

  const addToggle = () => {
    setIsAddOpen(!isAddOpen)
    setData("")
  }

  return (
    <>
      <div className="flex justify-center items-start">
        <div className="h-fit max-h-[80vh] w-full flex flex-col gap-4 px-2 sm:px-10">
          <div className="flex justify-between items-center gap-2">
            <span className="text-xl font-semibold">Budgets</span>
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => {
                setIsAddOpen(true)
              }}
            >
              <Plus />
              Add Budget
            </Button>
          </div>

          {isLoading && !budgets.length && (
            <div className=" bg-white min-h-[70vh] rounded-lg overflow-y-auto flex items-center justify-center">
              <div className="max-h-screen w-full no-scrollbar h-full flex items-center justify-center ">
                <Loader2 className="animate-spin" size={40} color="orange" />
                <div className="text-slate-700 text-semibold text-md">
                  Budgets Loading...
                </div>
              </div>
            </div>
          )}

          {!isLoading && !!budgets.length && (
            <div className=" bg-white rounded-lg py-4 px-4 overflow-y-auto">
              <Table>
                <TableHeader className="[&_tr]:!border-0 bg-slate-200">
                  <TableRow>
                    <TableHead className="text-slate-800 font-medium">
                      Budget amount
                    </TableHead>
                    <TableHead className="text-slate-800 font-medium">
                      Budget Type
                    </TableHead>
                    <TableHead className="text-slate-800 font-medium">
                      Spent
                    </TableHead>
                    <TableHead className="text-slate-800 font-medium">
                      Start Date
                    </TableHead>
                    <TableHead className="text-slate-800 font-medium">
                      End Date
                    </TableHead>
                    <TableHead className="w-12 text-slate-800 font-medium text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="[&_tr]:!border-l-0 [&_tr]:!border-r-0">
                  {budgets.map(budget => (
                    <TableRow key={budget._id} className="border-b-slate-100">
                      <TableCell className="text-slate-800 font-medium">
                        {budget.amount}
                      </TableCell>
                      <TableCell className="text-slate-800 font-normal">
                        {budget.category.map(category => category.name)}
                      </TableCell>
                      <TableCell className="text-slate-800 font-normal">
                        {budget.spent}
                      </TableCell>
                      <TableCell className="text-slate-800 font-normal">
                        {budget.period.startDate}
                      </TableCell>
                      <TableCell className="text-slate-800 font-normal">
                        {budget.period.endDate}
                      </TableCell>
                      <TableCell className="flex justify-center items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setData(budget)
                            setIsOpen(true)
                          }}
                          className="w-10 hover:bg-slate-100"
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-10"
                          onClick={() => {
                            setData(budget)
                            setIsDeleteOpen(true)
                          }}
                        >
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {!isLoading && !budgets.length && (
            <div className=" bg-white min-h-[70vh] rounded-lg py-4 px-4 overflow-y-auto flex items-center justify-center">
              <div className="max-h-screen h-full no-scrollbar">
                <div className="text-slate-700 text-bold text-xl">No Data</div>
              </div>
            </div>
          )}
        </div>
        <BudgetForm isOpen={isOpen} toggle={toggle} data={data} />
        <BudgetDelete
          isDeleteOpen={isDeleteOpen}
          deleteToggle={deleteToggle}
          data={data}
        />
        <AddBudgetForm isAddOpen={isAddOpen} addToggle={addToggle} />
      </div>
    </>
  )
}
