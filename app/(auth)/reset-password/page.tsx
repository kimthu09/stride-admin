import VerifyOTPForm from "@/components/auth/reset-password/otp-form";
import Image from "next/image";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col w-full h-4/5 justify-center items-center">
      <Image src={"/logo-name.png"} alt="logo" width={300} height={100} />
      <VerifyOTPForm />
    </div>
  );
};

export default ForgotPassword;
