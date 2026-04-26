import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TokenService } from '../../../core/services/token.service';
import { NotificationComponent } from '../../../modules/notification/pages/notification.component';
import { ListWeeksComponent } from '../../../modules/weeks/pages/list-weeks/list-weeks.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NotificationComponent, ListWeeksComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private readonly tokenService = inject(TokenService);

  userRoles: string[] = [];

  ngOnInit(): void {
    this.tokenService.roles$.subscribe((roles) => {
      this.userRoles = roles;
    });
  }

  get isLoggedIn(): boolean {
    return this.tokenService.hasToken();
  }

  get isAdmin(): boolean {
    return this.tokenService.isAdmin();
  }

  get isProfessor(): boolean {
    return this.tokenService.isProfessor();
  }

  get isStudent(): boolean {
    return this.tokenService.isStudent();
  }

  get canSeeUsers(): boolean {
    return this.isAdmin;
  }

  get canSeeAssignments(): boolean {
    return this.isProfessor || this.isAdmin;
  }

  get canSeeTasks(): boolean {
    return this.isStudent || this.isProfessor || this.isAdmin;
  }

  get canSeeReports(): boolean {
    return this.isProfessor || this.isAdmin;
  }

  get canSeeCourses(): boolean {
    return this.isProfessor || this.isAdmin;
  }

  get canSeeProfessorView(): boolean {
    return this.isProfessor || this.isAdmin;
  }

  get canSeeStudentView(): boolean {
    return this.isStudent || this.isAdmin;
  }

  protected logout(): void {
    this.tokenService.logoutAndRedirectToLogin();
  }
}