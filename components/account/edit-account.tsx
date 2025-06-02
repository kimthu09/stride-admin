"use client";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FaPen } from "react-icons/fa";
import { required } from "@/lib/helpers/zod";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import GenderRadioButton from "../ui/gender-radio-button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { formatDateToLocal, stringToDate } from "@/lib/helpers/date";
import { ApiError, Account } from "@/lib/types";
import { updateAccount } from "@/lib/api/account/updateAccount";
import { AxiosError } from "axios";
import { resetAdminPassword } from "@/lib/api/account/resetAdminPassword";

interface EditAccountProps {
  onAdded: () => void;
  account: Account;
}
const AccountSchema = z.object({
  name: required,
  email: z.string().email("Invalid email"),
  dob: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === "invalid_date" ? "Invalid date" : defaultError,
    }),
  }),
  isBlocked: z.boolean(),
});
const EditAccountDialog = ({ onAdded, account }: EditAccountProps) => {
  const {
    control,
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
      dob: new Date(),
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof AccountSchema>> = async (
    data
  ) => {
    setOpen(false);
    updateAccount(account.id, {
      ...data,
      dob: format(data.dob, "dd/MM/yyyy", {
        locale: vi,
      }),
      ava: account.ava,
    })
      .then(() => {
        onAdded();
        return toast({
          variant: "success",
          title: "Success",
          description: "Edit account successfully",
        });
      })
      .catch((err: AxiosError<ApiError>) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message ?? "Edit account failed",
        });
      });
  };

  const handleResetPassword = () => {
    setOpen(false);
    resetAdminPassword(account.id)
      .then(() => {
        onAdded();
        return toast({
          variant: "success",
          title: "Success",
          description: "Reset account password successfully",
        });
      })
      .catch((err: AxiosError<ApiError>) => {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            err.response?.data.message ?? "Reset account password failed",
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
  const resetForm = useCallback(() => {
    if (account) {
      reset({
        ...account,
        dob: stringToDate(account.dob ?? "") ?? new Date(),
      });
    }
  }, [account, reset]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) {
          resetForm();
        }
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="lg:px-4 px-2 whitespace-nowrap rounded-full text-gray-500 hover:text-gray-500"
        >
          <div className="flex flex-wrap gap-1 items-center">
            <FaPen />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="xl:max-w-[720px] max-w-[472px] p-0 bg-white">
        <DialogHeader>
          <DialogTitle className="p-6 pb-0">Edit Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
          <div className="p-6 flex flex-col gap-4 border-y-[1px]">
            <div>
              <label className="font-medium mt-2 text-black" htmlFor="nameNcc">
                Name
              </label>
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
              <label className="font-medium mt-2 text-black" htmlFor="email">
                Email
              </label>
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
              <label className="font-medium mt-2 text-black" htmlFor="dob">
                Date of birth
              </label>
              <Controller
                control={control}
                name="dob"
                render={({ field }) => (
                  <Input
                    onClick={(e) => e.preventDefault()}
                    id="dob"
                    value={
                      field.value instanceof Date
                        ? formatDateToLocal(field.value)
                        : field.value || ""
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                    type="date"
                  ></Input>
                )}
              />
              {errors.dob && (
                <span className="error___message">{errors.dob.message}</span>
              )}
            </div>
            <div>
              <label className="font-medium mt-2 text-black" htmlFor="dob">
                Status
              </label>
              <Controller
                control={control}
                name={`isBlocked`}
                render={({ field }) => (
                  <div className="flex flex-1 gap-2">
                    <GenderRadioButton
                      title="Blocked"
                      value={true}
                      onSelect={(value) => field.onChange(value)}
                      selected={field.value}
                      className="flex-1"
                    />
                    <GenderRadioButton
                      title="Active"
                      value={false}
                      onSelect={(value) => field.onChange(value)}
                      selected={!field.value}
                      className="flex-1"
                    />
                  </div>
                )}
              />
            </div>
          </div>
          <div className="p-4 flex-1 flex justify-between">
            <Button
              type="reset"
              variant={"destructive"}
              onClick={() => handleResetPassword()}
            >
              Reset Password
            </Button>
            <div className="flex gap-4">
              <Button
                type="reset"
                variant={"outline"}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit">Edit</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountDialog;
