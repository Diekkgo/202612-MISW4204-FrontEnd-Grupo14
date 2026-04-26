import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../../modules/auth/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly ROLES_KEY = 'auth_roles';

  private readonly router = inject(Router);

  private rolesSubject = new BehaviorSubject<string[]>(this.getRoles());
  roles$ = this.rolesSubject.asObservable();

  setSession(auth: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, auth.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(auth.user));
    localStorage.setItem(this.ROLES_KEY, JSON.stringify(auth.roles));
    this.rolesSubject.next(this.getRoles());
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): LoginResponse['user'] | null {
    const rawUser = localStorage.getItem(this.USER_KEY);
    if (!rawUser) return null;

    try {
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  }

  getRoles(): string[] {
    const rawRoles = localStorage.getItem(this.ROLES_KEY);
    if (!rawRoles) return [];

    try {
      const roles = JSON.parse(rawRoles);

      if (!Array.isArray(roles)) return [];

      return roles
        .map((role) => {
          if (typeof role === 'string') return role.toUpperCase().trim();
          return role?.name?.toUpperCase().trim();
        })
        .filter((role): role is string => !!role);
    } catch {
      return [];
    }
  }

  hasRole(...allowedRoles: string[]): boolean {
    const currentRoles = this.getRoles();

    return allowedRoles
      .map((role) => role.toUpperCase().trim())
      .some((role) => currentRoles.includes(role));
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  isProfessor(): boolean {
    return this.hasRole('PROFESOR');
  }

  isStudent(): boolean {
    return this.hasRole('ESTUDIANTE');
  }

  hasToken(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return !exp || Date.now() > exp;
    } catch {
      return true;
    }
  }

  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.ROLES_KEY);
    this.rolesSubject.next([]);
  }

  logoutAndRedirectToLogin(): void {
    this.clearSession();
    this.router.navigate(['/auth']);
  }
}