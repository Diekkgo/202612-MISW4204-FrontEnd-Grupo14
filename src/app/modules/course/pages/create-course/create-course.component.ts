import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-course',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {
  courseForm: FormGroup;
  submitted = false;

  constructor(private readonly fb: FormBuilder) {
    this.courseForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        type: ['', [Validators.required]],
        period: ['', [Validators.required,]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        observations: ['']
      }
    );
  }

  get name(): AbstractControl | null {
    return this.courseForm.get('name');
  }

  get type(): AbstractControl | null {
    return this.courseForm.get('type');
  }

  get period(): AbstractControl | null {
    return this.courseForm.get('period');
  }

  get startDate(): AbstractControl | null {
    return this.courseForm.get('startDate');
  }

  get endDate(): AbstractControl | null {
    return this.courseForm.get('endDate');
  }

  isInvalid(controlName: string): boolean {
    const control = this.courseForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  isValid(controlName: string): boolean {
    const control = this.courseForm.get(controlName);
    return !!control && control.valid && (control.touched || this.submitted);
  }

  formatedDate(date: string): string {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  }

  onSubmit(): void {
    this.submitted = true;
    this.courseForm.markAllAsTouched();

    if (this.courseForm.invalid) {
      return;
    }

    const formValue = {
      name: this.courseForm.value.name,
      type: this.courseForm.value.type,
      period: this.courseForm.value.period,
      startDate: this.formatedDate(this.courseForm.value.startDate),
      endDate: this.formatedDate(this.courseForm.value.endDate),
      observations: this.courseForm.value.observations
    };

    console.log('Curso creado:', formValue);

    // Llamar tu servicio

  }
}
