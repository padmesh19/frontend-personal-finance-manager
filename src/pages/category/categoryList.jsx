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
import CategoryForm from "./CategoryForm";
import AddCategoryForm from "./AddCategoryForm";
import CategoryDelete from "./CategoryDelete";
import categoryServices from "@/services/categoryServices";

export default function CategoryList() {
  const [category, setCategory] = useState([]);
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

  const fetchCategory = async () => {
    const response = await categoryServices.getAllCategory();
    setCategory(response.data);
  };

  useEffect(() => {
    fetchCategory();
  }, [data]);

  return (
    <div className="flex justify-center items-start">
      <div className="container h-fit max-h-[85vh] p-4 w-fit max-w-[80vw] flex flex-col gap-4 bg-white rounded-lg">
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-lg font-semibold">Categories</h2>
          <Button
            variant="blue"
            onClick={() => {
              setIsAddOpen(true);
            }}
          >
            <Plus />
            Add Category
          </Button>
        </div>
        <div className="rounded-lg overflow-y-auto">
          <Table className="w-full">
            <TableHeader className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
              <TableRow className="">
                <TableHead className=" text-white">Category Name</TableHead>
                <TableHead className=" text-white">Category Type</TableHead>
                <TableHead className=" text-white text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.map((category) => (
                <TableRow key={category._id}>
                  
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.category_type}</TableCell>
                  <TableCell className="flex justify-center items-center gap-2">
                    <Button
                      variant="default"
                      onClick={() => {
                        setData(category);
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
                        setData(category);
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
        <CategoryForm isOpen={isOpen} toggle={toggle} data={data} />
        <CategoryDelete
          isDeleteOpen={isDeleteOpen}
          deleteToggle={deleteToggle}
          data={data}
        />
        <AddCategoryForm isAddOpen={isAddOpen} addToggle={addToggle} />
      </div>
    </div>
  );
}
