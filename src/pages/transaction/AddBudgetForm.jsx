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

export default function AddBudgetForm({ isAddOpen, addToggle }) {
  const [budgetData, setBudgetData] = useState({
    amount: "",
    spent: "",
    startDate: Date.now(),
    endDate: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    const response = await categoryServices.getAllCategory();
    setCategories(response.data);
  };
  useEffect(() => {
    fetchCategory();
  }, []);


  const handleSubmit = async () => {
      if (
        budgetData.amount &&
        budgetData.category_id &&
        budgetData.spent &&
        budgetData.endDate
      ) {
        const response = await budgetServices.addBudget(budgetData);
        addToggle();
        toast.success("Budget added successfully");
        setBudgetData({
          amount: "",
          spent: "",
          startDate: Date.now(),
          endDate: Date.now(),
          category_id: "",
        });
      } else {
        toast.error("Fill all the details");
      }
  };

  const inputData = (key, value) => {
    setBudgetData((state) => ({ ...state, [key]: value }));
  };

  return (
    <Dialog open={isAddOpen}>
      <DialogContent className="max-w-[80vw] sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Add budget</DialogTitle>
          <DialogDescription>
            Add your budget here. Click add when you're done.
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
              <Select onValueChange={(e) => { inputData("category_id", e); }}> 
                <SelectTrigger className="h-9 bg-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent >
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" variant="outline" onClick={addToggle}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Add Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
