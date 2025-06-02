"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { ApiError, VerifyOtpPayload } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { addSeconds, format } from "date-fns";
import sendEmailForgotPassword from "@/lib/api/reset-password/sendEmailForgotPassword";
import useCountDown from "@/hooks/useCountdown";
import verifyTokenForgotPassword from "@/lib/api/reset-password/verifyTokenForgotPassword";

const VerifyOTPScheme = z.object({
  username: z.string().email("Invalid email"),
  token: z
    .string()
    .min(6, "The 6-digit OTP you entered is invalid")
    .max(6, "The 6-digit OTP you entered is invalid"),
});

const VerifyOTPForm = () => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<z.infer<typeof VerifyOTPScheme>>({
    resolver: zodResolver(VerifyOTPScheme),
    mode: "onChange",
    defaultValues: { username: "", token: "" },
  });
  const { remainingTime, startCountdown, wasOptSend } = useCountDown();

  const handleSendOtp = async () => {
    sendEmailForgotPassword({ email: getValues().username })
      .then((res) => {
        if (res.data) {
          startCountdown();
        }
      })
      .catch((err: AxiosError<ApiError>) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message ?? "Send OTP failed",
        });
      });
  };

  const onSubmit = async (data: VerifyOtpPayload) => {
    verifyTokenForgotPassword(data)
      .then((res) => {
        if (res.data.resetPasswordId) {
          window.location.href = `/reset-password/${res.data.resetPasswordId}`;
        }
      })
      .catch((err: AxiosError<ApiError>) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message ?? "Verify OTP failed",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-5 w-[350px]">
        <h1 className="text-3xl uppercase text-center mb-6">Forgot Password</h1>
        <div className="w-full flex flex-col gap-2">
          <span className="text-fs-gray-dark text-right">
            {!!remainingTime &&
              format(addSeconds(new Date(0), remainingTime), "mm:ss")}
          </span>
          <div className="relative flex-1">
            <Input
              placeholder="Email"
              {...register("username")}
              readOnly={wasOptSend}
            />
            {errors.username && (
              <span className="error___message">{errors.username.message}</span>
            )}
            <Button
              disabled={!isDirty || !!errors.username || wasOptSend}
              type="button"
              variant={"outline"}
              className="absolute top-1 right-1 h-8 px-2"
              onClick={() => handleSendOtp()}
            >
              <span className="text-sm">Send OTP</span>
            </Button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Controller
            control={control}
            name="token"
            render={({ field }) => (
              <InputOTP
                disabled={!wasOptSend}
                maxLength={6}
                onChange={(value) => field.onChange(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={!isDirty || !isValid || !wasOptSend}
        >
          Verify
        </Button>
      </div>
    </form>
  );
};
export default VerifyOTPForm;
