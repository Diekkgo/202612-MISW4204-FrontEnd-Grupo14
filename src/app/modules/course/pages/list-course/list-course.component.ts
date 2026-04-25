import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';
import { Course } from '../../models/course.model';
import { AcademicPeriod } from '../../models/http/courses.interface';

@Component({
  selector: 'app-list-course',
  imports: [RouterModule],
  templateUrl: './list-course.component.html',
  styleUrl: './list-course.component.css'
})
export class ListCourseComponent implements OnInit {

  private readonly courseService = inject(CourseService);
  courses: Course[] = [];
  academicPeriods: AcademicPeriod[] = [];

  ngOnInit(): void {
    this.getCourses();
    this.getAcademicPeriods();
  }

  getCourses() {
    this.courseService.getCourses().subscribe({
      next: (response) => {
        if (response) {
          this.courses = response.courses;
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
            title: `Error al cargar los cursos`
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
          title: `Error al cargar los cursos: ${error.error.message}`
        });
      }
    })
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

  getPeriodName(periodId: string): string {
    const period = this.academicPeriods.find(p => p.id === periodId);
    return period ? period.name : '—';
  }

  closeCourse(courseId: string) {
    if (courseId == '') {
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
        title: `Error al cerrar el curso`
      });
      return;
    }

    this.courseService.closeCourse(courseId).subscribe({
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
            title: `Curso cerrado exitosamente`
          });

          this.updateStageCourse(courseId);
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
            title: `Error al cerrar el curso`
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
          title: `Error al cerrar el curso: ${error.error.message}`
        });
      }
    })
  }

  updateStageCourse(courseId: string) {
    const index = this.courses.findIndex(c => c.id === courseId);

    if (index !== -1) {
      this.courses[index].status = 'CLOSED';
    }
  }
}
