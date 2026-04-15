import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'jwt_token';
  private router = inject(Router);

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // convertir a ms
      return Date.now() > exp;
    } catch (e) {
      return true;
    }
  }

  validateTokenAndRedirect(): boolean {
    const token = this.getToken();

    if (!token || this.isTokenExpired(token)) {
      this.logoutAndRedirectToLogin();
      return false;
    }

    return true;
  }

  logoutAndRedirectToLogin(): void {
    localStorage.removeItem(this.TOKEN_KEY);

    this.router.navigateByUrl('/auth');
  }
}
