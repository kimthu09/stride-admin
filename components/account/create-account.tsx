"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { passwordMinError, required } from "@/lib/helpers/zod";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { createAdminAccount } from "@/lib/api/account/createAccount";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { AxiosError } from "axios";
import { ApiError } from "@/lib/types";

const AccountSchema = z.object({
  name: required,
  email: z.string().email("Invalid email"),
  dob: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === "invalid_date" ? "Invalid date" : defaultError,
    }),
  }),
  password: z.string().min(6, passwordMinError),
});
interface CreateAccountProps {
  onAdded: () => void;
}
const CreateAccountDialog = ({ onAdded }: CreateAccountProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof AccountSchema>>({
    shouldUnregister: false,
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      dob: new Date(),
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof AccountSchema>> = async (
    data
  ) => {
    setOpen(false);
    createAdminAccount({
      ...data,
      dob: format(data.dob, "dd/MM/yyyy", {
        locale: vi,
      }),
      ava: "",
    })
      .then(() => {
        onAdded();
        return toast({
          variant: "success",
          title: "Success",
          description: "Add account successfully",
        });
      })
      .catch((err: AxiosError<ApiError>) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message ?? "Add account failed",
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
            name: "",
            email: "",
            password: "",
            dob: new Date(),
          });
        }
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button className="px-4 whitespace-nowrap">
          <div className="flex flex-wrap gap-1 items-center">
            Create Admin
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="xl:max-w-[720px] max-w-[472px] p-0 bg-white">
        <DialogHeader>
          <DialogTitle className="p-6 pb-0">Create Admin</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
          <div className="p-6 flex flex-col gap-4 border-y-[1px]">
            <div>
              <Input
                placeholder="Name"
                id="nameNcc"
                {...register("name")}
              ></Input>
              {errors.name && (
                <span className="error___message">{errors.name.message}</span>
              )}
            </div>
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
                onClick={(e) => e.preventDefault()}
                id="dob"
                type="date"
                {...register("dob")}
              ></Input>
              {errors.dob && (
                <span className="error___message">{errors.dob.message}</span>
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

export default CreateAccountDialog;
