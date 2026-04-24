import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Periods, Weeks } from '../../../weeks.model';

@Component({
  selector: 'app-create-edit-week-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-edit-weeks.component.html',
  styleUrls: ['./create-edit-weeks.component.css']
})
export class CreateEditWeeksComponent implements OnChanges {
  @Input() showWeekModal = false;
  @Input() periods: Periods[] = [];
  @Input() selectedWeek: Weeks | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Weeks>();

  weekForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.weekForm = this.fb.group(
      {
        id: [''],
        periodId: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
      },
      {
        validators: [this.validateWeek]
      }
    );

    this.weekForm.get('startDate')?.valueChanges.subscribe((value) => {
      if (!value) return;

      const fechaInicio = new Date(value + 'T00:00:00');
      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaInicio.getDate() + 6);

      this.weekForm.patchValue(
        { endDate: this.formatValidationDate(fechaFin) },
        { emitEvent: false }
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedWeek'] || changes['showWeekModal']) {
      this.loadForm();
    }
  }

  get isEdit(): boolean {
    return !!this.selectedWeek;
  }

  loadForm(): void {
    if (this.selectedWeek) {
      this.weekForm.patchValue({
        id: this.selectedWeek.ID ?? '',
        periodId: this.selectedWeek.PeriodID,
        startDate: this.formatDate(this.selectedWeek.StartDate),
        endDate: this.formatDate(this.selectedWeek.EndDate)
      });
    } else {
      this.weekForm.reset({
        id: '',
        periodId: '',
        startDate: '',
        endDate: ''
      });
    }
  }

  closeModal(): void {
    this.weekForm.reset();
    this.close.emit();
  }

  saveWeek(): void {
    this.weekForm.markAllAsTouched();

    if (this.weekForm.invalid) return;

    this.save.emit(this.weekForm.getRawValue());
    this.weekForm.reset();
    this.close.emit();
  }

  validateWeek(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (!startDate || !endDate) return null;

    const inicio = new Date(startDate + 'T00:00:00');
    const fin = new Date(endDate + 'T00:00:00');

    const diaInicio = inicio.getDay(); // lunes = 1
    const diaFin = fin.getDay(); // domingo = 0
    const diferenciaDias = Math.round(
      (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)
    );

    const errores: any = {};

    if (diaInicio !== 1) {
      errores.startNotMonday = true;
    }

    if (diaFin !== 0) {
      errores.endNotSunday = true;
    }

    if (diferenciaDias !== 6) {
      errores.invalidRange = true;
    }

    return Object.keys(errores).length ? errores : null;
  }

  formatValidationDate(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatDate(date: string | Date): string {
    if (!date) return '';

    const d = new Date(date);

    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  get periodId() {
    return this.weekForm.get('periodId');
  }

  get startDate() {
    return this.weekForm.get('startDate');
  }

  get endDate() {
    return this.weekForm.get('endDate');
  }
}