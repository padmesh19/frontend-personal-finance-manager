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

import { useEffect, useState } from "react";
import budgetServices from "@/services/budgetServices";
import { toast } from "react-toastify";

export default function BudgetDelete({ isDeleteOpen, deleteToggle, data }) {
  const handleSubmit = async () => {
      const response = await budgetServices.deleteBudget(data._id);
    deleteToggle();
    toast.success("Budget deleted successfully");
  };

  return (
    <Dialog open={isDeleteOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete budget</DialogTitle>
          <DialogDescription>
            Are you sure want to delete this Budget. Click Delete when you confirmed.
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
