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
  private readonly tokenService = inject(TokenService);

  protected logout(): void {
    this.tokenService.logoutAndRedirectToLogin();
  }
}
