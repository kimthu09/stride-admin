import ChangePasswordForm from "@/components/auth/reset-password/change_password_form";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Change password",
};

export interface ChangePasswordProps {
  token: string;
}
const ChangePassword = ({ params }: { params: ChangePasswordProps }) => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <Image src={"/logo-name.png"} alt="logo" width={300} height={100} />
      <ChangePasswordForm token={params.token} />
    </div>
  );
};

export default ChangePassword;
