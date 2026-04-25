import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { AcademicPeriod } from '../../models/http/courses.interface';
import Swal from 'sweetalert2';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-create-course',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent implements OnInit {
  courseForm: FormGroup;
  submitted = false;

  academicPeriods: AcademicPeriod[] = [];

  private readonly courseService = inject(CourseService);
  private readonly router = inject(Router);

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

  ngOnInit(): void {
    this.getAcademicPeriods();
  }

  getAcademicPeriods() {
    this.courseService.getAcademicPeriods().subscribe({
      next: (response) => {
        if (response) {
          this.academicPeriods = response
        } else {
          Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          }).fire({
            icon: "error",
            title: `Error al cargar los periodos académicos`
          });
        }
      },
      error: (error) => {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "error",
          title: `Error al cargar los periodos académicos ${error.error.message}`
        });
      }
    })
  }

  createCourse(course: Course) {
    this.courseService.createCourse(course).subscribe({
      next: (response) => {
        if (response) {
          Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          }).fire({
            icon: "success",
            title: `Curso creado exitosamente`
          });
          this.router.navigate(['/courses']);
        } else {
          Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          }).fire({
            icon: "error",
            title: `Error al crear curso`
          });
        }
      },
      error(error) {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "error",
          title: `Error al crear curso ${error.error.message}`
        });
      }
    })
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

    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    this.submitted = true;
    this.courseForm.markAllAsTouched();

    if (this.courseForm.invalid) {
      return;
    }

    const formValue: Course = {
      name: this.courseForm.value.name,
      type: this.courseForm.value.type,
      period_id: this.courseForm.value.period,
      start_date: this.formatedDate(this.courseForm.value.startDate),
      end_date: this.formatedDate(this.courseForm.value.endDate),
      observations: this.courseForm.value.observations
    };

    this.createCourse(formValue);

  }
}
