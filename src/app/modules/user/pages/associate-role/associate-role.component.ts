import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-associate-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './associate-role.component.html',
  styleUrl: './associate-role.component.css'
})
export class AssociateRoleComponent {
  submitted = false;

  availableRoles = [
    { id: 'ADMIN', label: 'Administrador' },
    { id: 'PROFESOR', label: 'Profesor' },
    { id: 'ESTUDIANTE', label: 'Estudiante' }
  ];

  roleForm: FormGroup;

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

    console.log('Roles seleccionados:', selectedRoles);

    // Eenviar al servicio:
  }
}