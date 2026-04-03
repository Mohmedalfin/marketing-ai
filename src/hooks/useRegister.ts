import { useState, useEffect } from "react";
import { registerUser } from "../services/authService";
import type { RegisterRequest, RegisterResponse } from "../types/auth";

interface UseRegisterReturn {
  handleRegister: (data: RegisterRequest) => Promise<RegisterResponse>;
  loading: boolean;
  error: string;
}

export const useRegister = (): UseRegisterReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleRegister = async (
    data: RegisterRequest
  ): Promise<RegisterResponse> => {
    try {
      setLoading(true);
      setError("");

      const result = await registerUser(data);
      return result;

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      }

      setError("Terjadi kesalahan sistem");
      throw new Error("Unknown error");

    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
};