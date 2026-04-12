// src/services/userService.ts

import { ENV } from "../config/env";
import type { UserProfile } from "../types/user";

export const getCurrentUserAPI = async (): Promise<UserProfile> => {
  const token = localStorage.getItem("access_token");

  let response: Response;
  try {
    response = await fetch(`${ENV.API_URL}/api/v1/auth/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (error) {
    throw new Error(
      `Gagal terhubung ke server. Periksa koneksi Anda. Detail: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }

  let data: unknown;
  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(
      `Server mengembalikan respons yang tidak terduga (Status: ${response.status})`
    );
  }

  if (!response.ok) {
    const err = data as Record<string, unknown> | null;
    const message =
      (err?.message as string) ??
      (err?.detail as string) ??
      (err?.error as string) ??
      `Terjadi kesalahan (Status: ${response.status})`;
    throw new Error(message);
  }

  return data as UserProfile;
};
