import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import AddTransaction from "./AddTransaction";
import EditTransactionForm from "./EditTransaction/index";
import TransactionDelete from "./TransactionDelete";
import {  useSelector } from "react-redux";
import { categoryState } from "@/redux/features/categorySlice";

export default function TransactionList() {
  const {categories} = useSelector(categoryState)
  const { transactions, isLoading, error } = useSelector((state) => state.transaction);
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

  console.log(categories)

  return (
    <div className="flex justify-center items-start">
      <div className="h-fit max-h-[80vh] w-full flex flex-col gap-4 px-10">
        <div className="flex justify-between items-center gap-2">
          <span className="text-xl font-semibold">Transactions</span>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => {
              setIsAddOpen(true);
            }}
          >
            <Plus />
            Add Transaction
          </Button>
        </div>
        <div className=" bg-white rounded-lg py-4 px-4 overflow-y-auto">
          <Table>
            <TableHeader className="[&_tr]:!border-0 bg-slate-200">
              <TableRow>
                <TableHead className="text-slate-800 font-medium">
                  Transaction amount
                </TableHead>
                <TableHead className="text-slate-800 font-medium">
                  Transaction Date
                </TableHead>
                <TableHead className="text-slate-800 font-medium">
                  Transaction Description
                </TableHead>
                <TableHead className="text-slate-800 font-medium">
                  Transaction Type
                </TableHead>
                <TableHead className="text-slate-800 font-medium">
                  Category
                </TableHead>
                <TableHead className="w-12 text-slate-800 font-medium text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr]:!border-l-0 [&_tr]:!border-r-0">
              {transactions.map((transaction) => (
                <TableRow key={transaction._id} className="border-b-slate-100">
                  <TableCell className="text-slate-800 font-medium">
                    {transaction.amount}
                  </TableCell>
                  <TableCell className="text-slate-800 font-normal">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="text-slate-800 font-normal">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="text-slate-800 font-normal">
                    {transaction.transaction_type}
                  </TableCell>
                  <TableCell className="text-slate-800 font-normal">
                    {categories.map((category) => {
                      if (category._id == transaction.category_id) {
                      return category.name
                    }})}
                  </TableCell>
                  <TableCell className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setData(transaction);
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
                        setData(transaction);
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
        <EditTransactionForm isOpen={isOpen} toggle={toggle} data={data} />
        <TransactionDelete
          isDeleteOpen={isDeleteOpen}
          deleteToggle={deleteToggle}
          data={data}
        />
        <AddTransaction isAddOpen={isAddOpen} addToggle={addToggle} />
      </div>
    </div>
  );
}
