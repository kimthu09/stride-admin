"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ApiError, UserInfo } from "@/lib/types";
import useSWR, { KeyedMutator } from "swr";
import getUser from "@/lib/api/auth/getUser";
import { AxiosError, AxiosResponse } from "axios";
import { logOut } from "@/lib/api/auth/logout";
import { toast } from "@/hooks/use-toast";

interface AuthContextProps {
  user: UserInfo | null;
  isLoading: boolean;
  logout: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<AxiosResponse<UserInfo, any>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  const { data, isLoading, mutate } = useSWR("/admin/user", () => getUser());

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data]);

  const logout = () => {
    logOut()
      .then(() => {
        Cookies.remove("token");
        setUser(null);
        window.location.href = "/login";
      })
      .catch((err: AxiosError<ApiError>) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message ?? "Logout failed",
        });
      });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, mutate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
