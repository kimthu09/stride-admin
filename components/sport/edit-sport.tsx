"use client";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FaPen } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ApiError, Sport } from "@/lib/types";
import { AxiosError } from "axios";
import { updateSport } from "@/lib/api/sport/updateSport";
import { SportSchema } from "./create-sport";
import { SportMapType } from "@/lib/constants/enum";
import uploadFile from "@/lib/api/uploadFile";
import CategoryList from "../category/category-list";
import { HexColorInput } from "react-colorful";
import ColorPopover from "./color-popover";
import SizeRadioButton from "../ui/size-button";
import ImageUpload from "../ui/choose-image";
import { Textarea } from "../ui/textarea";
import { PiPlus } from "react-icons/pi";

interface EditSportProps {
  onAdded: () => void;
  sport: Sport;
}
const EditSportDialog = ({ onAdded, sport }: EditSportProps) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageList, setImageList] = useState<string[]>([]);

  const sportMapTypeList = Object.values(SportMapType);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof SportSchema>>({
    shouldUnregister: false,
    resolver: zodResolver(SportSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      color: "",
      rules: [],
      sportMapType: SportMapType.NOMAP,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "rules",
  });
  const sportMapType = watch("sportMapType");

  const onSubmit: SubmitHandler<z.infer<typeof SportSchema>> = async (data) => {
    setOpen(false);
    let imageUrl = sport.image;
    if (file !== undefined) {
      const uploadPromises = uploadFile(file);
      imageUrl = await uploadPromises;
    }

    updateSport(sport.id, {
      ...data,
      image: imageUrl,
    })
      .then(() => {
        onAdded();
        return toast({
          variant: "success",
          title: "Success",
          description: "Update sport successfully",
        });
      })
      .catch((err: AxiosError<ApiError>) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message ?? "Update sport failed",
        });
      });
  };

  const handleUpload = (files: File[]) => {
    setFile(files[0]);
  };

  const resetForm = useCallback(() => {
    if (sport) {
      reset({ ...sport, categoryId: sport.category.id });
      setImageList([sport.image]);
    }
  }, [sport, reset]);

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
      <DialogContent className="xl:max-w-[720px] max-w-[630px] p-0 bg-white">
        <DialogHeader>
          <DialogTitle className="p-6 pb-0">Edit Sport</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex flex-col gap-4 border-y-[1px]">
            <div>
              <div className="font-medium">Sport name</div>
              <Input
                placeholder="Name"
                id="nameNcc"
                {...register("name")}
              ></Input>
              {errors.name && (
                <span className="error___message">{errors.name.message}</span>
              )}
            </div>
            <div className="flex gap-2 w-full flex-1">
              <div className="flex-1">
                <div className="font-medium">Category</div>
                <Controller
                  control={control}
                  name={`categoryId`}
                  render={({ field }) => (
                    <div className="flex flex-1 gap-2">
                      <CategoryList
                        isId
                        category={field.value}
                        setCategory={(value: string | number) =>
                          field.onChange(value)
                        }
                      />
                    </div>
                  )}
                />
                {errors.categoryId && (
                  <span className="error___message">
                    {errors.categoryId.message}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium">Color</div>
                <Controller
                  control={control}
                  name={`color`}
                  render={({ field }) => (
                    <div className="flex flex-1 gap-1 responsive w-full">
                      <HexColorInput
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        prefixed
                        color={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                      <ColorPopover
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="h-10 w-10 aspect-square rounded-md border p-[2px]  bg-transparent"
                        >
                          <div
                            className="h-full w-full rounded-sm"
                            style={{ backgroundColor: field.value }}
                          />
                        </Button>
                      </ColorPopover>
                    </div>
                  )}
                />
                {errors.color && (
                  <span className="error___message">
                    {errors.color.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <Controller
                control={control}
                name="sportMapType"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {sportMapTypeList.map((type) => (
                      <SizeRadioButton
                        key={type}
                        name={type}
                        selected={field.value === type}
                        onSelect={(value) => field.onChange(value)}
                      />
                    ))}
                  </div>
                )}
              />
              {errors.sportMapType && (
                <span className="error___message">
                  {errors.sportMapType.message}
                </span>
              )}
            </div>
            <div>
              <div className="font-medium">Image</div>
              <ImageUpload
                onUpload={handleUpload}
                imageList={imageList}
                setImageList={setImageList}
                fileCount={1}
              />
              {file === undefined && (
                <span className="error___message">At least 1 image</span>
              )}
            </div>
            {sportMapType !== SportMapType.NOMAP && (
              <div className="mb-2 flex flex-col gap-3">
                <div className="font-medium">
                  <p>
                    Rules{" "}
                    <span className="font-normal text-gray-500">
                      ( [SPEED] {">"}= 3.22 && [SPEED] {"<"} 4.83 )
                    </span>
                  </p>
                </div>
                <div
                  className="mb-2 flex flex-col gap-3 max-h-60 overflow-y-auto p-2"
                  style={{ scrollbarGutter: "stable" }}
                >
                  {fields.map((item, index) => (
                    <div key={`rule-${index}`} className="relative flex gap-2">
                      <div className="flex-1">
                        <Textarea
                          placeholder="Enter the expression"
                          className="!min-h-10"
                          {...register(`rules.${index}.expression`)}
                          maxLength={100}
                        />
                        {errors.rules &&
                          errors.rules[index] &&
                          errors.rules[index].expression?.message && (
                            <span className="error___message">
                              {errors.rules[index].expression?.message}
                            </span>
                          )}
                      </div>
                      <div className="">
                        <Input
                          className="h-14 w-20"
                          placeholder="met"
                          {...register(`rules.${index}.met`)}
                        ></Input>
                        {errors.rules &&
                          errors.rules[index] &&
                          errors.rules[index].met?.message && (
                            <span className="error___message">
                              {errors.rules[index].met?.message}
                            </span>
                          )}
                      </div>
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant={"outline"}
                        className="absolute -top-2 -right-2 rounded-full h-5 w-5 p-0"
                      >
                        <div className="h-[2px] w-2.5 bg-fs-error rounded-lg"></div>
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="px-2 pr-5">
                  <Button
                    type="button"
                    variant={"outline"}
                    className="h-10 w-full rounded-md p-0"
                    onClick={() => append({ expression: "", met: 0 })}
                  >
                    Rule
                    <PiPlus
                      style={{ height: 30, width: 30 }}
                      className="text-fs-gray-darker"
                    />
                  </Button>
                </div>
              </div>
            )}
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

              <Button type="submit">Edit</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSportDialog;
