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
import categoryServices from "@/services/categoryServices";
import { toast } from "react-toastify";

export default function AddCategoryForm({ isAddOpen, addToggle }) {
  const [categoryData, setCategoryData] = useState({
    name: "",
    category_type:""
  });

  const handleSubmit = async () => {
    if (categoryData.name && categoryData.category_type) {
      const response = await categoryServices.addCategory(categoryData);
      addToggle();
      toast.success("Category added successfully");
      setCategoryData({
        name: "",
        category_type: "",
      });
    } else {
      toast.error('Fill all the details');
    }
    
  };

  const inputData = (key, value) => {
    setCategoryData((state) => ({ ...state, [key]: value }));
  };

  return (
    <Dialog open={isAddOpen}>
      <DialogContent className="max-w-[80vw] sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add your category here. Click add when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Category Name
            </Label>
            <Input
              id="name"
              type="text"
              onChange={(e) => {
                inputData("name", e.target.value);
              }}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="" className="text-right">
              Category Type
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="income"
                name="category_type"
                type="radio"
                onClick={() => {
                  inputData("category_type", "income");
                }}
                className="col-span-2 w-4"
              />
              <Label htmlFor="income">Income</Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="expense"
                name="category_type"
                type="radio"
                onClick={() => {
                  inputData("category_type", "expense");
                }}
                className="col-span-2 w-4"
              />
              <Label htmlFor="expense">Expense</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" variant="outline" onClick={addToggle}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
