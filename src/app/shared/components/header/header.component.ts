import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { NotificationComponent } from '../../../modules/notification/pages/notification.component';
import { ListWeeksComponent } from '../../../modules/weeks/pages/list-weeks/list-weeks.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, NotificationComponent, ListWeeksComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userRole: string[] = [];

  isAdmin = false;
  isProfessor = false;
  private readonly tokenService = inject(TokenService);

  ngOnInit(): void {
    this.tokenService.roles$.subscribe((roles) => {
      this.userRole = roles;
      this.isAdmin = roles.includes('ADMIN');
      this.isProfessor = roles.includes('PROFESOR');
    });
  }

  protected logout(): void {
    this.tokenService.logoutAndRedirectToLogin();
  }
}