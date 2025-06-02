import type { Metadata } from "next";
import "@/lib/styles/globals.css";
import Sidebar from "@/components/sidebar";
import HeaderMobile from "@/components/header-mobile";
import { Toaster } from "@/components/ui/toaster";
import SWRProvider from "@/components/auth/swr-provider";
import { AuthProvider } from "@/components/auth/auth-context";
import { LoadingSpinner } from "@/components/loading-spinner";

export const metadata: Metadata = {
  title: "Stride Admin",
  description: "Stride Admin Website",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1">
      <LoadingSpinner />
      <SWRProvider>
        <AuthProvider>
          <Sidebar />
        </AuthProvider>
      </SWRProvider>
      <main className="flex flex-1 h-screen">
        <div className="flex w-full flex-col overflow-y-hidden">
          <SWRProvider>
            <AuthProvider>
              <HeaderMobile />
              <div className="md:p-10 p-4 mt-0 overflow-auto">{children}</div>
            </AuthProvider>
          </SWRProvider>
          <Toaster />
        </div>
      </main>
    </div>
  );
}
