export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}