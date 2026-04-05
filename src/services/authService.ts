// src/services/authService.ts

import { ENV } from "../config/env";
import type { 
  RegisterRequest, 
  RegisterResponse, 
  LoginRequest, 
  LoginResponse 
} from "../types/auth";

// ==========================================
// 1. SERVICE REGISTER (Kode Lama Kamu)
// ==========================================
export const registerUser = async (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
  let response;
  try {
    response = await fetch(`${ENV.API_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error("Gagal terhubung ke server. Periksa koneksi Anda.");
  }

  let data;
  try {
    const textData = await response.text();
    data = textData ? JSON.parse(textData) : {};
  } catch (error) {
    console.error("JSON Parse Error:", error);
    throw new Error(`Server mengembalikan respons yang tidak terduga (Status: ${response.status})`);
  }

  if (!response.ok) {
    let errorMessage = "Terjadi kesalahan yang tidak diketahui";

    if (data) {
      if (typeof data.message === "string") errorMessage = data.message;
      else if (typeof data.error === "string") errorMessage = data.error;
      else if (typeof data.detail === "string") errorMessage = data.detail;
      else if (typeof data.msg === "string") errorMessage = data.msg;
      else if (data.errors && typeof data.errors === "object") {
        const keys = Object.keys(data.errors);
        if (keys.length > 0) {
          const firstError = data.errors[keys[0]];
          errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
        }
      } else if (Object.keys(data).length > 0) {
        errorMessage = JSON.stringify(data).substring(0, 300);
      }
    }

    const lowerError = errorMessage.toLowerCase();
    if (lowerError.includes("email") && (lowerError.includes("exist") || lowerError.includes("taken") || lowerError.includes("terdaftar") || lowerError.includes("already"))) {
      errorMessage = "Email ini sudah didaftarkan. Silakan gunakan email lain atau lakukan Login.";
    } else if (lowerError.includes("username") && (lowerError.includes("exist") || lowerError.includes("taken") || lowerError.includes("terdaftar"))) {
      errorMessage = "Username ini sudah digunakan. Silakan pilih username lain.";
    }

    throw new Error(errorMessage);
  }

  return data as RegisterResponse;
};


// ==========================================
// 2. SERVICE LOGIN (Sesuai Swagger)
// ==========================================
export const loginUser = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  
  const params = new URLSearchParams();
  params.append("grant_type", payload.grant_type || "password");
  params.append("username", payload.username);
  params.append("password", payload.password);
  
  if (payload.scope) params.append("scope", payload.scope);
  if (payload.client_id) params.append("client_id", payload.client_id);
  if (payload.client_secret) params.append("client_secret", payload.client_secret);

  let response;
  try {
    response = await fetch(`${ENV.API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Accept": "application/json"
      },
      body: params.toString()
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error("Gagal terhubung ke server. Periksa koneksi Anda.");
  }

  let data;
  try {
    const textData = await response.text();
    data = textData ? JSON.parse(textData) : {};
  } catch (error) {
    console.error("JSON Parse Error:", error);
    throw new Error(`Server mengembalikan respons yang tidak terduga (Status: ${response.status})`);
  }

  if (!response.ok) {
    let errorMessage = "Terjadi kesalahan yang tidak diketahui saat login";

    if (data) {
      if (typeof data.message === "string") errorMessage = data.message;
      else if (typeof data.error === "string") errorMessage = data.error;
      else if (typeof data.detail === "string") errorMessage = data.detail;
      else if (typeof data.msg === "string") errorMessage = data.msg;
      else if (data.errors && typeof data.errors === "object") {
        const keys = Object.keys(data.errors);
        if (keys.length > 0) {
          const firstError = data.errors[keys[0]];
          errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
        }
      } else if (Object.keys(data).length > 0) {
        errorMessage = JSON.stringify(data).substring(0, 300);
      }
    }

    const lowerError = errorMessage.toLowerCase();
    if (lowerError.includes("invalid") || lowerError.includes("credential") || lowerError.includes("password") || lowerError.includes("unauthorized")) {
      errorMessage = "Email atau password yang Anda masukkan salah.";
    } else if (lowerError.includes("not found") || lowerError.includes("user")) {
      errorMessage = "Akun tidak ditemukan. Silakan daftar terlebih dahulu.";
    }

    throw new Error(errorMessage);
  }

  return data as LoginResponse;
};