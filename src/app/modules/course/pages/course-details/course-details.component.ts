import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AcademicPeriod } from '../../models/http/courses.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course-details',
  imports: [RouterModule, DatePipe],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {

  private readonly courseService = inject(CourseService);
  private readonly route = inject(ActivatedRoute);
  course: Course = new Course('', '', '', '', '', '');
  academicPeriods: AcademicPeriod[] = [];
  courseId = '';

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';

    this.getCourse(this.courseId);
    this.getAcademicPeriods();
  }

  getCourse(courseId: string) {
    this.courseService.getCourse(courseId).subscribe({
      next: (response) => {
        if(response){
          this.course = response;
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
          title: `Error al obtener el curso ${error.error.message}`
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
}
