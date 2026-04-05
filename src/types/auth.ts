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

export interface LoginRequest {
    grant_type?: string;    
    username: string;        
    password: string;
    scope?: string;          
    client_id?: string;      
    client_secret?: string;  
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    expires_in?: number;
    refresh_token?: string;
}

export interface ApiError {
  message?: string;
  error?: string;
}