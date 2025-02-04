import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import budgetServices from "@/services/budgetServices";
import categoryServices from "@/services/categoryServices";
import { toast } from "react-toastify";

export default function BudgetForm({ isOpen, toggle, data }) {
  const [budgetData, setBudgetData] = useState({
    amount: data?.amount || "",
    spent: data?.spent || "",
    startDate: data?.period?.startDate || "",
    endDate: data?.period?.endDate || "",
  });

  useEffect(() => {
    if (data) {
      setBudgetData({
        amount: data?.amount || "",
        spent: data?.spent || "",
        startDate: data?.period?.startDate || "",
        endDate: data?.period?.endDate || "",
      });
    }
  }, [data]);

  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    const response = await categoryServices.getAllCategory();
    setCategories(response.data);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = async () => {
    const response = await budgetServices.updateBudget(data._id, budgetData);
    toggle();
    toast.success("Budget updated successfully");
  };

  const inputData = (key, value) => {
    setBudgetData((state) => ({ ...state, [key]: value }));
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit budget</DialogTitle>
          <DialogDescription>
            Make changes to your budget here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={budgetData?.amount}
              onChange={(e) => {
                inputData("amount", e.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="spent" className="text-right">
              Spent
            </Label>
            <Input
              id="spent"
              type="number"
              value={budgetData?.spent}
              onChange={(e) => {
                inputData("spent", e.target.value);
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid w-full grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right">
              Start Date
            </Label>
            <div className="col-span-3">
              <DatePicker
                value={budgetData.startDate}
                setValue={(val) => {
                  inputData("startDate", val);
                }}
              />
            </div>
          </div>
          <div className="grid w-full grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right">
              End Date
            </Label>
            <div className="col-span-3">
              <DatePicker
                value={budgetData.endDate}
                setValue={(val) => {
                  inputData("endDate", val);
                }}
              />
            </div>
          </div>
          <div className="grid w-full grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right">
              Category
            </Label>
            <div className="col-span-3">
              <Select onValueChange={inputData}>
                <SelectTrigger className="h-9 bg-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" variant="outline" onClick={toggle}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
