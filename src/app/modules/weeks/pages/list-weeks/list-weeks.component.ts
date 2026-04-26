import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditWeeksComponent } from '../create-edit-weeks/create-edit-weeks/create-edit-weeks.component';
import { WeeksService } from '../../weeks.service';
import { Weeks, Periods } from '../../weeks.model';

@Component({
  selector: 'app-list-weeks-modal',
  standalone: true,
  imports: [CommonModule, CreateEditWeeksComponent],
  templateUrl: './list-weeks.component.html',
  styleUrls: ['./list-weeks.component.css']
})
export class ListWeeksComponent implements OnInit {
  showModal = false;
  weeks: Weeks[] = [];
  periods: Periods[] = [];
  showWeekModal = false;
  selectedWeek: any = null;

  constructor(private weeksService: WeeksService) {}
  
  ngOnInit(): void {
    this.loadPeriods();
  }

  loadWeeks(): void {
    this.weeksService.getWeeks().subscribe({
      next: (data) => {
        this.weeks = data;
      },
      error: (err) => {
        console.error('Error cargando semanas', err);
      }
    });
  } 
  
  loadPeriods(): void {
    this.weeksService.getPeriods().subscribe({
      next: (data) => {
        this.periods = data;
      },
      error: (err) => {
        console.error('Error cargando periodos', err);
      }
    });
  }

  openModal(): void {
    this.showModal = true;
    this.loadWeeks();
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveWeek(data: any): void {
    const payload = {
      period_id: data.periodId,
      start_date: data.startDate,
      end_date: data.endDate
    };

    if (data.id) {
      this.weeksService.updateWeek(data.id, payload).subscribe({
        next: () => {
          this.loadWeeks();
          this.closeWeekForm();
        },
        error: (err) => {
          console.error('Error actualizando semana', err);
        }
      });

      return;
    }

    this.weeksService.createWeek(payload).subscribe({
      next: () => {
        this.loadWeeks();
        this.closeWeekForm();
      },
      error: (err) => {
        console.error('Error creando semana', err);
      }
    });
  }

  deleteWeek(id: string): void {
    const confirmado = confirm('Seguro que deseas eliminar esta semana?');
    if (!confirmado) return;

    this.weeksService.deleteWeek(id).subscribe({
      next: () => {
        this.loadWeeks();
      },
      error: (err) => {
        console.error('Error eliminando semana', err);
      }
    });
  }
  activateWeek(id: string): void {
    this.weeksService.activateWeek(id).subscribe({
      next: () => {
        this.loadWeeks();
      },
      error: (err) => {
        console.error('Error activando semana', err);
      }
    });
  }
  closeWeek(id: string): void {
    this.weeksService.closeWeek(id).subscribe({
      next: () => {
        this.loadWeeks();
      },
      error: (err) => {
        console.error('Error cerrando semana', err);
      }
    });
  }

  openModalCreateWeek(): void {
    this.selectedWeek = null;
    this.showWeekModal = true;
  }

  openModalEditWeek(weekId: string): void {
    this.showWeekModal = true;

    this.weeksService.getWeekById(weekId).subscribe({
      next: (data) => {
        this.selectedWeek = data;
        this.showWeekModal = true;
      },
      error: (err) => {
        console.error('Error cargando detalle de la semana', err);
      }
    });
  }

  closeWeekForm(): void {
    this.showWeekModal = false;
    this.selectedWeek = null;
  }
}