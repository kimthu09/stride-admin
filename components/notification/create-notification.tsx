import React, { useState } from "react";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { required } from "@/lib/helpers/zod";
import { Input } from "../ui/input";
import ImageUpload from "../ui/choose-image";
import { toast } from "@/hooks/use-toast";
import uploadFile from "@/lib/api/uploadFile";
import { createNotification } from "@/lib/api/createNotification";
import { AxiosError } from "axios";
import { ApiError } from "@/lib/types";

const NotificationSchema = z.object({
  title: required,
  message: required,
});

const CreateNotification = ({ children }: { children: React.ReactNode }) => {
  const [openPass, setOpenPass] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);

  const passForm = useForm<z.infer<typeof NotificationSchema>>({
    resolver: zodResolver(NotificationSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: errorPass },
  } = passForm;
  const onOpenPass = (value: boolean) => {
    if (value) {
      reset();
    }
    setOpenPass(value);
  };

  const onSubmit: SubmitHandler<z.infer<typeof NotificationSchema>> = async (
    data
  ) => {
    setOpenPass(false);
    if (file === undefined) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No image uploaded",
      });
      return;
    }
    const uploadPromises = uploadFile(file);
    const imageUrl = await uploadPromises;
    createNotification({ ...data, banner: imageUrl })
      .then(() => {
        return toast({
          variant: "success",
          title: "Success",
          description: "Send notification successfully",
        });
      })
      .catch((err: AxiosError<ApiError>) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message ?? "Send notification failed",
        });
      });
  };

  const handleUpload = (files: File[]) => {
    setFile(files[0]);
  };

  return (
    <Dialog open={openPass} onOpenChange={onOpenPass}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[472px] p-0 bg-white">
        <DialogHeader>
          <DialogTitle className="p-6 pb-0">Send notification</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex flex-col gap-4 border-y-[1px]">
            <div>
              <label htmlFor="title" className="font-medium mb-2">
                Title
              </label>
              <Input
                placeholder="Title"
                id="title"
                {...register("title")}
              ></Input>
              {errorPass.title && (
                <span className="error___message">
                  {errorPass.title.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="message" className="font-medium mb-2">
                Message
              </label>
              <Input
                placeholder="message"
                id="message"
                {...register("message")}
              ></Input>
              {errorPass.message && (
                <span className="error___message">
                  {errorPass.message.message}
                </span>
              )}
            </div>
            <div>
              <div className="font-medium">Banner</div>
              <ImageUpload onUpload={handleUpload} fileCount={1} isBanner />
              {file === undefined && (
                <span className="error___message">At least 1 image</span>
              )}
            </div>
          </div>
          <div className="p-4 flex-1 flex justify-end">
            <div className="flex gap-4">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setOpenPass(false)}
              >
                Cancel
              </Button>

              <Button>Confirm</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNotification;
