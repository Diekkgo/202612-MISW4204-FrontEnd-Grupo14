import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AssignmentView,
  PersonSummary,
  ProfessorTaskView,
  ReportedVsContracted,
  SupervisedPerson,
  WeeklyDetail,
  WeekOption
} from '../professor.model';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {
  supervisedPeople: SupervisedPerson[] = [];
  filteredPeople: SupervisedPerson[] = [];
  assignments: AssignmentView[] = [];
  weeklyDetail: WeeklyDetail | null = null;
  summary: PersonSummary | null = null;
  tasks: ProfessorTaskView[] = [];
  reportedVsContracted: ReportedVsContracted[] = [];
  weeks: WeekOption[] = [];

  search = '';
  selectedWeekId = '';
  selectedPersonId = '';

  showAssignmentsModal = false;
  showWeeklyDetailModal = false;
  showSummaryModal = false;
  showTasksModal = false;
  showReportedVsContractedModal = false;

  selectedPersonName = '';

  constructor(private professorViewService: ProfessorService) {}

  ngOnInit(): void {
    this.loadPeople();
    this.loadWeeks();
    this.loadTasks();
  }

  loadPeople(): void {
    this.professorViewService.getSupervisedPeople().subscribe((data: SupervisedPerson[]) => {
      this.supervisedPeople = data;
      this.filteredPeople = data;
    });
  }

  loadWeeks(): void {
    this.professorViewService.getWeeks().subscribe(data => {
      this.weeks = data;
      if (data.length > 0) {
        this.selectedWeekId = data[0].id;
      }
    });
  }

  loadTasks(): void {
    this.professorViewService.getTasksByProfessor().subscribe(data => {
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
      person.name.toLowerCase().includes(term) ||
      person.email.toLowerCase().includes(term) ||
      person.role.toLowerCase().includes(term)
    );
  }

  openAssignments(person: SupervisedPerson): void {
    this.selectedPersonId = person.userId;
    this.selectedPersonName = person.name;

    this.professorViewService.getAssignmentsByPerson(person.userId).subscribe(data => {
      this.assignments = data;
      this.showAssignmentsModal = true;
    });
  }

  openWeeklyDetail(person: SupervisedPerson): void {
    this.selectedPersonId = person.userId;
    this.selectedPersonName = person.name;

    if (!this.selectedWeekId) return;

    this.professorViewService.getWeeklyDetail(person.userId, this.selectedWeekId).subscribe(data => {
      this.weeklyDetail = data;
      this.showWeeklyDetailModal = true;
    });
  }

  openSummary(person: SupervisedPerson): void {
    this.selectedPersonId = person.userId;
    this.selectedPersonName = person.name;

    this.professorViewService.getPersonSummary(person.userId).subscribe(data => {
      this.summary = data;
      this.showSummaryModal = true;
    });
  }

  openTasksModal(): void {
    this.showTasksModal = true;
  }

  openReportedVsContractedModal(): void {
    if (!this.selectedWeekId) return;

    this.professorViewService.getReportedVsContracted(this.selectedWeekId).subscribe(data => {
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