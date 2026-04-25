import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Rol } from '../../models/rol.model';
import { UserUpdateRolesModel } from '../../models/http/users.interface';

@Component({
  selector: 'app-associate-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './associate-role.component.html',
  styleUrl: './associate-role.component.css'
})
export class AssociateRoleComponent implements OnInit {
  submitted = false;

  availableRoles = [
    { id: 1, label: 'Administrador' },
    { id: 2, label: 'Profesor' },
    { id: 3, label: 'Estudiante' }
  ];

  roleForm: FormGroup;
  userId: string = '';

  private readonly userServive = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor(private readonly fb: FormBuilder) {
    this.roleForm = this.fb.group(
      {
        roles: this.fb.array(
          this.availableRoles.map(() => this.fb.control(false))
        )
      },
      {
        validators: [this.atLeastOneRoleValidator]
      }
    );
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';

    this.getRolesByUser(this.userId);
  }

  getRolesByUser(userId: string) {
    this.userServive.getUser(userId).subscribe({
      next: (response) => {
        if (response) {
          this.setRoles(response.roles);
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
            title: `Error al cargar el usuario`
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
          title: `Error al cargar el usuario: ${error}`
        });
      }
    })
  }

  updateRoles(userId: string, roles: UserUpdateRolesModel) {
    this.userServive.updateRolesByUser(userId, roles).subscribe({
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
            title: `Roles actualizados exitosamente`
          });

          this.router.navigate(['/users']);
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
            title: `Error al cargar el usuario`
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
          title: `Error al actualizar roles: ${error}`
        });
      }
    })
  }

  setRoles(roles: Rol[]) {
    const userRoleIds = roles.map((role: any) => role.id);
    this.roleForm.patchValue({
      roles: this.availableRoles.map(role =>
        userRoleIds.includes(role.id)
      )
    });

    this.roleForm.updateValueAndValidity();
  }

  get roles(): FormArray {
    return this.roleForm.get('roles') as FormArray;
  }

  atLeastOneRoleValidator(control: AbstractControl): ValidationErrors | null {
    const rolesArray = control.get('roles') as FormArray;

    if (!rolesArray) return null;

    const hasSelectedRole = rolesArray.controls.some(role => role.value === true);

    return hasSelectedRole ? null : { noRoleSelected: true };
  }

  onSubmit(): void {
    this.submitted = true;
    this.roleForm.markAllAsTouched();

    if (this.roleForm.invalid) {
      return;
    }

    const selectedRoles = this.roles.controls
      .map((control, index) => control.value ? this.availableRoles[index].id : null)
      .filter(role => role !== null);

    const roles: UserUpdateRolesModel = {
      roles: selectedRoles
    }

    this.updateRoles(this.userId, roles);
  }
}