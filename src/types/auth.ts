export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  firstName?: string;
  lastName?: string;
  expires: string;
}

export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}
