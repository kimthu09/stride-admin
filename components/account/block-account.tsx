import React from "react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import ConfirmDialog from "../ui/confirm-dialog";
import { AxiosError } from "axios";
import { ApiError } from "@/lib/types";
import { blockAccount } from "@/lib/api/account/blockAccount";
import { FaToggleOff } from "react-icons/fa6";
interface BlockAccountDialogProps {
  id: string;
  isBlocked: boolean;
  onDelete: () => void;
}

const BlockAccountDialog = ({
  id,
  onDelete,
  isBlocked,
}: BlockAccountDialogProps) => {
  const handleDelete = () => {
    blockAccount(id, isBlocked)
      .then(() => {
        onDelete();
        return toast({
          variant: "success",
          title: "Success",
          description: isBlocked
            ? "Block account successfully"
            : "Unblock account successfully",
        });
      })
      .catch((err: AxiosError<ApiError>) => {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            err.response?.data.message ?? isBlocked
              ? "Block account failed"
              : "Unblock account failed",
        });
      });
  };

  return (
    <ConfirmDialog
      title={"Confirmation"}
      description={`Are you sure you want to ${
        isBlocked ? "block" : "unblock"
      } this account?`}
      handleYes={() => handleDelete()}
    >
      <Button
        size="icon"
        variant="outline"
        className="whitespace-nowrap rounded-full text-red-600 hover:text-red-700"
      >
        <div className="flex flex-wrap gap-1 items-center">
          <FaToggleOff className="!h-6 !w-6" />
        </div>
      </Button>
    </ConfirmDialog>
  );
};

export default BlockAccountDialog;
