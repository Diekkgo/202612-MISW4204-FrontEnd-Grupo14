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

interface Periodo {
  id: string;
  nombre: string;
}

interface Semana {
  id?: string;
  periodId: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-create-edit-week-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-edit-weeks.component.html',
  styleUrls: ['./create-edit-weeks.component.css']
})
export class CreateEditWeeksComponent implements OnChanges {
  @Input() mostrarModal = false;
  @Input() periodos: Periodo[] = [];
  @Input() semana: Semana | null = null;

  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Semana>();

  semanaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.semanaForm = this.fb.group(
      {
        id: [''],
        periodId: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
      },
      {
        validators: [this.validarSemana]
      }
    );

    this.semanaForm.get('startDate')?.valueChanges.subscribe((value) => {
      if (!value) return;

      const fechaInicio = new Date(value + 'T00:00:00');
      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaInicio.getDate() + 6);

      this.semanaForm.patchValue(
        { endDate: this.formatearFecha(fechaFin) },
        { emitEvent: false }
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['semana'] || changes['mostrarModal']) {
      this.cargarFormulario();
    }
  }

  get esEdicion(): boolean {
    return !!this.semana;
  }

  cargarFormulario(): void {
    if (this.semana) {
      this.semanaForm.patchValue({
        id: this.semana.id ?? '',
        periodId: this.semana.periodId,
        startDate: this.semana.startDate,
        endDate: this.semana.endDate
      });
    } else {
      this.semanaForm.reset({
        id: '',
        periodId: '',
        startDate: '',
        endDate: ''
      });
    }
  }

  cerrarModal(): void {
    this.semanaForm.reset();
    this.cerrar.emit();
  }

  guardarSemana(): void {
    this.semanaForm.markAllAsTouched();

    if (this.semanaForm.invalid) return;

    this.guardar.emit(this.semanaForm.getRawValue());
    this.semanaForm.reset();
    this.cerrar.emit();
  }

  validarSemana(control: AbstractControl): ValidationErrors | null {
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

  formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  get periodId() {
    return this.semanaForm.get('periodId');
  }

  get startDate() {
    return this.semanaForm.get('startDate');
  }

  get endDate() {
    return this.semanaForm.get('endDate');
  }
}