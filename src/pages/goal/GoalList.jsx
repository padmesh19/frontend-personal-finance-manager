import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import goalServices from "@/services/goalServices";
import GoalDelete from './GoalDelete';
import GoalForm from './GoalForm';
import AddGoalForm from "./AddGoalForm";
import { useDispatch, useSelector } from "react-redux";
import { goalState } from "@/redux/features/goalSlice";


export default function GoalList() {
  const dispatch = useDispatch();
  const { goals } = useSelector(
    goalState
  );
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

  console.log("Goals",goals)
  return (
    <div className="flex justify-center items-start">
      <div className="h-fit max-h-[80vh] w-full flex flex-col gap-4 px-10">
        <div className="flex justify-between items-center gap-2">
          <span className="text-xl font-semibold">Goals</span>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => {
              setIsAddOpen(true);
            }}
          >
            <Plus />
            Add Goals
          </Button>
        </div>
        <div className=" bg-white rounded-lg py-4 px-4 overflow-y-auto">
          <Table>
            <TableHeader className="[&_tr]:!border-0 bg-slate-200">
              <TableRow>
                <TableHead className="text-slate-800 font-medium">
                  Goal Name
                </TableHead>
                <TableHead className="text-slate-800 font-medium">
                  Target Amount
                </TableHead>
                <TableHead className="text-slate-800 font-medium">
                  Current Amount
                </TableHead>
                <TableHead className="text-slate-800 font-medium">
                  Deadline
                </TableHead>
                <TableHead className="text-slate-800 font-medium">
                  Status
                </TableHead>
                <TableHead className="w-12 text-slate-800 font-medium text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr]:!border-l-0 [&_tr]:!border-r-0">
              {goals.map((goal) => (
                <TableRow key={goal._id} className="border-b-slate-100">
                  <TableCell className="text-slate-800 font-medium">
                    {goal.name}
                  </TableCell>
                  <TableCell className="text-slate-800 font-normal">
                    {goal.targetAmount}
                  </TableCell>
                  <TableCell className="text-slate-800 font-normal">
                    {goal.currentAmount}
                  </TableCell>
                  <TableCell className="text-slate-800 font-normal">
                    {goal.deadline}
                  </TableCell>
                  <TableCell className="text-slate-800 font-normal">
                    {goal.status.charAt(0).toUpperCase() +
                      goal.status.slice(1)}
                  </TableCell>
                  <TableCell className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setData(goal);
                        setIsOpen(true);
                      }}
                      className="w-10 hover:bg-slate-100"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-10"
                      onClick={() => {
                        setData(goal);
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
        <GoalForm isOpen={isOpen} toggle={toggle} data={data} />
        <GoalDelete
          isDeleteOpen={isDeleteOpen}
          deleteToggle={deleteToggle}
          data={data}
        />
        <AddGoalForm isAddOpen={isAddOpen} addToggle={addToggle} />
      </div>
    </div>
  );
}
