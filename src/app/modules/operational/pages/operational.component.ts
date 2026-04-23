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

  weeks: WeekOption[] = [];
  selectedWeekId = '';
  search = '';

  showTasksModal = false;
  showHistoryModal = false;
  showHistoryDetailModal = false;

  constructor(private operativeViewService: OperationalService) {}

  ngOnInit(): void {
    this.loadParticipations();
    this.loadTasks();
    this.loadHistory();
    this.loadWeeks();
  }

  loadParticipations(): void {
    this.operativeViewService.getParticipations().subscribe(data => {
      this.participations = data;
      this.filteredParticipations = data;
    });
  }

  loadTasks(): void {
    this.operativeViewService.getMyTasks().subscribe(data => {
      this.tasks = data;
      this.filteredTasks = data;
    });
  }

  loadHistory(): void {
    this.operativeViewService.getHistory().subscribe(data => {
      this.history = data;
    });
  }

  loadWeeks(): void {
    this.operativeViewService.getWeeks().subscribe(data => {
      this.weeks = data;
    });
  }

  filterParticipations(): void {
    const term = this.search.trim().toLowerCase();

    if (!term) {
      this.filteredParticipations = this.participations;
      return;
    }

    this.filteredParticipations = this.participations.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.professorName.toLowerCase().includes(term) ||
      item.type.toLowerCase().includes(term)
    );
  }

  filterTasks(): void {
    if (!this.selectedWeekId) {
      this.filteredTasks = this.tasks;
      return;
    }

    this.filteredTasks = this.tasks.filter(task => task.weekId === this.selectedWeekId);
  }

  openTasksModal(): void {
    this.filterTasks();
    this.showTasksModal = true;
  }

  openHistoryModal(): void {
    this.showHistoryModal = true;
  }

  openHistoryDetail(weekId: string): void {
    this.operativeViewService.getHistoryDetail(weekId).subscribe(data => {
      this.historyDetail = data;
      this.showHistoryDetailModal = true;
    });
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
      case 'REPORTED':
        return 'status-reported';
      case 'PENDING':
        return 'status-pending';
      case 'COMPLETED':
        return 'status-completed';
      default:
        return '';
    }
  }
}