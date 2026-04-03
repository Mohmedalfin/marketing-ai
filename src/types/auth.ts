export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  business: string;
  domicile: string;
}

export interface RegisterResponse {
  message: string;
  data?: {
    id: number;
    username: string;
    email: string;
  };
}

export interface ApiError {
  message?: string;
  error?: string;
}