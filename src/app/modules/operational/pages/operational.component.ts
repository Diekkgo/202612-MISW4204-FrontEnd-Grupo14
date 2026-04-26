import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  UserParticipation,
  UserTaskRecord,
  WeeklyHistoryDetail,
  WeeklyHistoryItem,
  WeekOption
} from '../operational.model';
import { OperationalService } from '../operational.service';
import { Weeks } from '../../weeks/weeks.model';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-operational',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './operational.component.html',
  styleUrls: ['./operational.component.css']
})
export class OperationalComponent implements OnInit {
  participations: UserParticipation[] = [];
  filteredParticipations: UserParticipation[] = [];

  tasks: UserTaskRecord[] = [];
  filteredTasks: UserTaskRecord[] = [];

  history: WeeklyHistoryItem[] = [];
  historyDetail: WeeklyHistoryDetail | null = null;

  weeks: Weeks[] = [];
  selectedWeekId = '';
  search = '';

  userId: string = '';

  showTasksModal = false;
  showHistoryModal = false;
  showHistoryDetailModal = false;

  constructor(private operativeViewService: OperationalService, private tokenService: TokenService) {}

  ngOnInit(): void {
    let user = this.tokenService.getUser();
    if (user) {
      this.userId = user.id;
    }

    this.loadWeeks();
    this.loadParticipations();
  }

  loadParticipations(): void {
    this.operativeViewService.getCourses(this.userId).subscribe(data => {
      this.participations = data;
      this.filteredParticipations = data;
    });
  }

  loadTasks(): void {
    this.operativeViewService.getMyTasks(this.userId, this.selectedWeekId).subscribe(data => {
      this.tasks = data;
      this.filteredTasks = data;

      this.filterTasks();
    });
  }

  loadHistory(): void {
    this.operativeViewService.getHistory(this.userId, this.selectedWeekId).subscribe(data => {
      this.history = data;
    });
  }

  loadWeeks(): void {
    this.operativeViewService.getWeeks().subscribe(data => {
      this.weeks = data;
      
      if (data.length > 0) {
        this.selectedWeekId = data[0].ID;
      }
    });
  }

  filterParticipations(): void {
    const term = this.search.trim().toLowerCase();

    if (!term) {
      this.filteredParticipations = this.participations;
      return;
    }

    this.filteredParticipations = this.participations.filter(item =>
      item.course_name.toLowerCase().includes(term) ||
      item.professor.toLowerCase().includes(term) ||
      item.course_type.toLowerCase().includes(term)
    );
  }

  filterTasks(): void {
    if(!this.tasks) {
      this.filteredTasks = [];
      return;
    }

    if (!this.selectedWeekId) {
      this.filteredTasks = this.tasks;
      return;
    }

    this.filteredTasks = this.tasks.filter(task => task.weekId === this.selectedWeekId);
  }

  openTasksModal(): void {
    this.loadTasks();
    this.showTasksModal = true;
  }

  openHistoryModal(): void {
    this.loadHistory();
    this.showHistoryModal = true;
  }

  closeModals(): void {
    this.showTasksModal = false;
    this.showHistoryModal = false;
    this.showHistoryDetailModal = false;
  }

  getTypeLabel(type: string): string {
    return type === 'COURSE' ? 'Curso' : 'Proyecto';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'status-reported';
      case 'PENDING':
        return 'status-pending';
      case 'CLOSED':
        return 'status-completed';
      default:
        return '';
    }
  }
}