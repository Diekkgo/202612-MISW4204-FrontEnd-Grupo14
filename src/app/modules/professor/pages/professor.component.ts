import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Course,
  Student,
  PersonSummary,
  ProfessorTaskView,
  ReportedVsContracted,
  WeeklyDetail,
  WeekOption
} from '../professor.model';
import { ProfessorService } from '../professor.service';
import { Weeks } from '../../weeks/weeks.model';
import { TokenService } from '../../../core/services/token.service';
import { AuthUser } from '../../auth/models/auth.model';

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {
  supervisedPeople: Student[] = [];
  filteredPeople: Student[] = [];
  courses: Course[] = [];
  weeklyDetail: WeeklyDetail[] = [];
  summary: PersonSummary[] = [];
  tasks: ProfessorTaskView[] = [];
  reportedVsContracted: ReportedVsContracted[] = [];
  weeks: Weeks[] = [];
  userId: string = '';
  professorId: string | null = null;

  search = '';
  selectedWeekId = '';
  selectedPersonId = '';

  showAssignmentsModal = false;
  showWeeklyDetailModal = false;
  showSummaryModal = false;
  showTasksModal = false;
  showReportedVsContractedModal = false;

  selectedPersonName = '';

  constructor(private professorViewService: ProfessorService, private tokenService: TokenService) {}

  ngOnInit(): void {
    let user = this.tokenService.getUser();
    if (user) {
      this.professorId = user.id;
    }

    this.loadWeeks();    
    this.loadPeople();
  }

  loadPeople(): void {
    if (!this.professorId) return;
    this.professorViewService.getStudents(this.professorId).subscribe((data: Student[]) => {
      this.supervisedPeople = data;
      this.filteredPeople = data;
    });
  }

  loadWeeks(): void {
    this.professorViewService.getWeeks().subscribe(data => {
      this.weeks = data;
      if (data.length > 0) {
        this.selectedWeekId = data[0].ID;
      }
    });
  }

  loadTasks(): void {
    if (!this.professorId) return;
    
    this.professorViewService.getTasksByProfessor(this.selectedWeekId, this.professorId).subscribe(data => {
      this.tasks = data;
    });
  }

  filterPeople(): void {
    const term = this.search.trim().toLowerCase();

    if (!term) {
      this.filteredPeople = this.supervisedPeople;
      return;
    }

    this.filteredPeople = this.supervisedPeople.filter(person =>
      person.Name.toLowerCase().includes(term) ||
      person.Email.toLowerCase().includes(term) ||
      person.Role.toLowerCase().includes(term)
    );
  }

  openCourses(person: Student): void {
    this.selectedPersonId = person.UserID;
    this.selectedPersonName = person.Name;

    if (!this.professorId) return;

    this.professorViewService.getCoursesByPerson(this.selectedPersonId, this.professorId).subscribe(data => {
      this.courses = data;
      this.showAssignmentsModal = true;
    });
  }

  openWeeklyDetail(person: Student): void {
    this.selectedPersonId = person.UserID;
    this.selectedPersonName = person.Name;

    if (!this.selectedWeekId) return;

    this.professorViewService.getWeeklyDetail(person.UserID).subscribe(data => {
      this.weeklyDetail = data; 
      
      this.showWeeklyDetailModal = true;
    });
  }

  openSummary(person: Student): void {
    this.selectedPersonId = person.UserID;
    this.selectedPersonName = person.Name;

    this.professorViewService.getConsolidated(person.UserID).subscribe(data => {
      this.summary = data;
      this.showSummaryModal = true;
    });
  }

  openTasksModal(): void {
    this.loadTasks();
    this.showTasksModal = true;
  }

  openReportedVsContractedModal(): void {
    if (!this.selectedWeekId || !this.professorId) return;

    this.professorViewService.getReportedVsContracted(this.selectedWeekId, this.professorId).subscribe(data => {
      this.reportedVsContracted = data;
      this.showReportedVsContractedModal = true;
    });
  }

  closeModals(): void {
    this.showAssignmentsModal = false;
    this.showWeeklyDetailModal = false;
    this.showSummaryModal = false;
    this.showTasksModal = false;
    this.showReportedVsContractedModal = false;
  }

  getRoleLabel(role: string): string {
    return role === 'MONITOR' ? 'Monitor' : 'Asistente graduado';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'COMPLETE':
        return 'status-complete';
      case 'INCOMPLETE':
        return 'status-incomplete';
      case 'EXCEEDED':
        return 'status-exceeded';
      case 'NO_REPORT':
        return 'status-no-report';
      default:
        return '';
    }
  }
}