import React from "react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { FaTrash } from "react-icons/fa";
import ConfirmDialog from "../ui/confirm-dialog";
import { AxiosError } from "axios";
import { ApiError } from "@/lib/types";
import { deleteSport } from "@/lib/api/sport/deleteSport";


interface DeleteSportProps {
  id: string;
  onDelete: () => void;
}

const DeleteSport = ({ id, onDelete }: DeleteSportProps) => {
  const handleDelete = () => {
    deleteSport(id)
      .then(() => {
        onDelete();
        return toast({
          variant: "success",
          title: "Success",
          description: "Delete sport successfully",
        });
      })

      .catch((err: AxiosError<ApiError>) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message ?? "Delete sport failed",
        });
      });
  };

  return (
    <ConfirmDialog
      title={"Confirmation"}
      description="Are you sure you want to delete this sport?"
      handleYes={() => handleDelete()}
    >
      <Button
        size="icon"
        variant="outline"
        className="lg:px-4 px-2 whitespace-nowrap rounded-full text-fs-error hover:text-fs-error"
      >
        <div className="flex flex-wrap gap-1 items-center">
          <FaTrash />
        </div>
      </Button>
    </ConfirmDialog>
  );
};

export default DeleteSport;
