export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthRole {
  id: number;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
  roles: AuthRole[];
}