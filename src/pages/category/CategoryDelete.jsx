import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import categoryServices from "@/services/categoryServices";
import { toast } from "react-toastify";

export default function CategoryDelete({ isDeleteOpen, deleteToggle, data }) {
  const handleSubmit = async () => {
      const response = await categoryServices.deleteCategory(data._id);
    deleteToggle();
    toast.success("Category deleted successfully");
  };

  return (
    <Dialog open={isDeleteOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Are you sure want to delete this Category. Click Delete when you confirmed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant="outline" onClick={deleteToggle}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
           Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
