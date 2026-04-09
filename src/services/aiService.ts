// src/services/aiService.ts
import { ENV } from "../config/env";
import type { 
  AiGenerateRequest, 
  AiGenerateResponse, 
  AiScheduleRequest, 
  AiScheduleResponse 
} from "../types/ai";

export const generatePosterAPI = async (
  payload: AiGenerateRequest
): Promise<AiGenerateResponse> => {
  
  const token = localStorage.getItem('access_token');
  
  let response;
  try {
    response = await fetch(`${ENV.API_URL}/api/v1/generate/studio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
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
    let errorMessage = `Terjadi kesalahan (Status: ${response.status})`;
    
    if (data) {
      if (typeof data.message === "string") errorMessage = data.message;
      else if (typeof data.error === "string") errorMessage = data.error;
      else if (typeof data.detail === "string") errorMessage = data.detail;
    }

    if (errorMessage === "Not Found" || response.status === 404) {
      errorMessage = `Endpoint API tidak ditemukan (404) di: ${ENV.API_URL}/api/v1/ai/generate/studio. Pastikan URL-nya sudah benar di backend.`;
    }

    throw new Error(errorMessage);
  }

  return data as AiGenerateResponse;
};

export const schedulePostAPI = async (
  payload: AiScheduleRequest
): Promise<AiScheduleResponse> => {
  const token = localStorage.getItem('access_token');
  
  let response;
  try {
    console.log(`Sending POST to ${ENV.API_URL}/api/v1/schedule with payload:`, payload);
    response = await fetch(`${ENV.API_URL}/api/v1/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("Fetch Error details:", error);
    throw new Error(`Gagal terhubung ke server. Periksa koneksi Anda. Detail: ${error instanceof Error ? error.message : String(error)}`);
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
    let errorMessage = `Terjadi kesalahan (Status: ${response.status})`;
    
    if (data) {
      if (typeof data.message === "string") errorMessage = data.message;
      else if (typeof data.error === "string") errorMessage = data.error;
      else if (typeof data.detail === "string") errorMessage = data.detail;
    }
    
    throw new Error(errorMessage);
  }

  return data as AiScheduleResponse;
};
