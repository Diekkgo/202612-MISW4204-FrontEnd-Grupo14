import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected readonly tokenService = inject(TokenService);

  protected get isLoggedIn(): boolean {
    return this.tokenService.hasToken();
  }

  protected get canSeeAssignments(): boolean {
    return this.tokenService.hasRole('PROFESOR', 'ADMIN');
  }

  protected get canSeeTasks(): boolean {
    return this.tokenService.hasRole('ESTUDIANTE', 'PROFESOR', 'ADMIN');
  }

  protected get canManageUsers(): boolean {
    return this.tokenService.hasRole('ADMIN');
  }

  protected get canSeeReports(): boolean {
    return this.tokenService.hasRole('PROFESOR', 'ADMIN');
  }

  protected logout(): void {
    this.tokenService.logoutAndRedirectToLogin();
  }
}