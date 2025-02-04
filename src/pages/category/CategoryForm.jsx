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

export default function CategoryForm({ isOpen, toggle, data }) {
  const [categoryData, setCategoryData] = useState({
    name: data?.name || "",
    category_type: data?.category_type || "",
  });

  useEffect(() => {
    if (data) {
      setCategoryData({
        name: data?.name || "",
        category_type: data?.category_type || "",
      });
    }
  }, [data]);

  const handleSubmit = async () => {
    const response = await categoryServices.updateCategory(data._id, categoryData);
    toggle();
    toast.success("Category updated successfully");
  };

  const inputData = (key, value) => {
    setCategoryData((state) => ({ ...state, [key]: value }));
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>
            Make changes to your category here. Click save when you're done.
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
              value={categoryData?.name}
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
