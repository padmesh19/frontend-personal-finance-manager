import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import BudgetForm from "./budgetForm";
import budgetServices from "@/services/budgetServices";
import BudgetDelete from "./budgetDelete";
import AddBudgetForm from "./AddBudgetForm";
import { toast } from "react-toastify";

export default function BudgetList() {
  const [budget, setBudget] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [data, setData] = useState(null);
  const toggle = () => {
    setIsOpen(!isOpen);
    setData(null);
  };
  const deleteToggle = () => {
    setIsDeleteOpen(!isDeleteOpen);
    setData(null);
  };
  const addToggle = () => {
    setIsAddOpen(!isAddOpen);
    setData("");
  };

  const fetchBudget = async () => {
    const response = await budgetServices.getAllBudget();
    setBudget(response.data);
  };

  useEffect(() => {
    fetchBudget();
  }, [data]);

  return (
    <div className="flex justify-center items-start">
      <div className="container h-fit max-h-[85vh] px-8 py-4 min-w-[40vw] w-fit max-w-[80vw] flex flex-col gap-4 bg-white rounded-lg">
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-lg font-semibold">Budgets</h2>
          <Button
            variant="blue"
            onClick={() => {
              setIsAddOpen(true);
            }}
          >
            <Plus />
            Add Budget
          </Button>
        </div>
        <div className="rounded-lg overflow-y-auto">
          <Table className="w-full">
            <TableHeader className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
              <TableRow className="">
                <TableHead className=" text-white">Budget amount</TableHead>
                <TableHead className=" text-white">Budget Type</TableHead>
                <TableHead className=" text-white">Spent</TableHead>
                <TableHead className=" text-white">Start Date</TableHead>
                <TableHead className=" text-white">End Date</TableHead>
                <TableHead className=" text-white text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budget.map((budget) => (
                <TableRow key={budget._id}>
                  <TableCell className="font-medium">{budget.amount}</TableCell>
                  <TableCell>
                    {budget.category.map((category) => category.name)}
                  </TableCell>
                  <TableCell>{budget.spent}</TableCell>
                  <TableCell>{budget.period.startDate}</TableCell>
                  <TableCell>{budget.period.endDate}</TableCell>
                  <TableCell className="flex justify-center items-center gap-2">
                    <Button
                      variant="default"
                      onClick={() => {
                        setData(budget);
                        setIsOpen(true);
                      }}
                      className="w-10"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-10"
                      onClick={() => {
                        setData(budget);
                        setIsDeleteOpen(true);
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
        <BudgetForm isOpen={isOpen} toggle={toggle} data={data} />
        <BudgetDelete
          isDeleteOpen={isDeleteOpen}
          deleteToggle={deleteToggle}
          data={data}
        />
        <AddBudgetForm isAddOpen={isAddOpen} addToggle={addToggle} />
      </div>
    </div>
  );
}
