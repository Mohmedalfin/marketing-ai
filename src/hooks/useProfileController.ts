// src/hooks/useProfileController.ts

import { useState, useEffect } from "react";
import { getCurrentUserAPI } from "../services/userService";
import type { UserProfile } from "../types/user";

interface UseProfileControllerReturn {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

export const useProfileController = (): UseProfileControllerReturn => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getCurrentUserAPI();
        setUser(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal memuat data profil."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, error };
};
