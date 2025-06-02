"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { passwordMinError } from "@/lib/helpers/zod";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { createUserAccount } from "@/lib/api/account/createAccount";
import { AxiosError } from "axios";
import { ApiError } from "@/lib/types";

const AccountSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, passwordMinError),
});
interface CreateAccountProps {
  onAdded: () => void;
}
const CreateUserDialog = ({ onAdded }: CreateAccountProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof AccountSchema>>({
    shouldUnregister: false,
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof AccountSchema>> = async (
    data
  ) => {
    setOpen(false);
    createUserAccount(data)
      .then(() => {
        onAdded();
        return toast({
          variant: "success",
          title: "Success",
          description: "Add user successfully",
        });
      })
      .catch((err: AxiosError<ApiError>) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message ?? "Add user failed",
        });
      });
  };

  const onErrors: SubmitErrorHandler<z.infer<typeof AccountSchema>> = (
    data
  ) => {
    console.log(data);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Try again",
    });
  };
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) {
          reset({
            email: "",
            password: "",
          });
        }
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button className="px-4 whitespace-nowrap">
          <div className="flex flex-wrap gap-1 items-center">
            <FaPlus />
            Create User
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="xl:max-w-[720px] max-w-[472px] p-0 bg-white">
        <DialogHeader>
          <DialogTitle className="p-6 pb-0">Create User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
          <div className="p-6 flex flex-col gap-4 border-y-[1px]">
            <div>
              <Input
                id="email"
                placeholder="Email"
                {...register("email")}
              ></Input>
              {errors.email && (
                <span className="error___message">{errors.email.message}</span>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <span className="error___message">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="p-4 flex-1 flex justify-end">
            <div className="flex gap-4">
              <Button
                type="reset"
                variant={"outline"}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit">Add</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
