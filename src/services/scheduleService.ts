// src/services/scheduleService.ts
import { ENV } from "../config/env";
import type { GetSchedulesResponse, UpdateSchedulePayload } from "../types/schedule";

export const getSchedulesAPI = async (): Promise<GetSchedulesResponse> => {
  const token = localStorage.getItem('access_token');
  
  let response;
  try {
    response = await fetch(`${ENV.API_URL}/api/v1/schedule/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      }
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

  // The backend might return an array directly, or inside a data property. 
  // Based on standard REST, let's assume it returns an array if it matches the schema you provided.
  if (Array.isArray(data)) {
    return data;
  } else if (data.data && Array.isArray(data.data)) {
    return data.data;
  }
  
  return [];
};

export const updateScheduleAPI = async (
  id: number,
  payload: UpdateSchedulePayload
) => {
  const token = localStorage.getItem('access_token');
  
  let response;
  try {
    const url = `${ENV.API_URL}/api/v1/schedule/${id}`;
    console.log(`Sending PUT to ${url} with payload:`, payload);
    response = await fetch(url, {
      method: "PUT",
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
    let errorMessage = `Terjadi kesalahan saat mengupdate data (Status: ${response.status})`;
    if (data) {
      if (typeof data.message === "string") errorMessage = data.message;
      else if (typeof data.error === "string") errorMessage = data.error;
      else if (typeof data.detail === "string") errorMessage = data.detail;
    }
    throw new Error(errorMessage);
  }

  return data;
};

export const deleteScheduleAPI = async (id: number): Promise<{ message: string }> => {
  const token = localStorage.getItem('access_token');
  
  let response;
  try {
    const url = `${ENV.API_URL}/api/v1/schedule/${id}`;
    console.log(`Sending DELETE to ${url}`);
    response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      }
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
    let errorMessage = `Terjadi kesalahan saat menghapus data (Status: ${response.status})`;
    if (data) {
      if (typeof data.message === "string") errorMessage = data.message;
      else if (typeof data.error === "string") errorMessage = data.error;
      else if (typeof data.detail === "string") errorMessage = data.detail;
    }
    throw new Error(errorMessage);
  }

  return data;
};
