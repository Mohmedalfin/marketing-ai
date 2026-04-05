// src/hooks/useLogin.ts

import { useState } from "react";
import { loginUser } from "../services/authService"; 
import type { LoginRequest, LoginResponse } from "../types/auth";

interface UseLoginReturn {
  handleLogin: (data: LoginRequest) => Promise<LoginResponse>;
  loading: boolean;
  error: string;
}

export const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (
    data: LoginRequest
  ): Promise<LoginResponse> => {
    try {
      setLoading(true);
      setError("");

      // Memanggil fungsi dari authService yang sudah kita buat tadi
      const result = await loginUser(data);
      return result;

    } catch (err: unknown) {
      if (err instanceof Error) {
        // Menangkap pesan error spesifik hasil olahan authService
        // (Contoh: "Email atau password yang Anda masukkan salah.")
        setError(err.message);
        throw err;
      }

      setError("Terjadi kesalahan sistem saat login");
      throw new Error("Unknown error");

    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};