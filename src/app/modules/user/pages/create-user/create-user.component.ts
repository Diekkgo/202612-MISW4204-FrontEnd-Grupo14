import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userForm: FormGroup;
  submitted = false;

  availableRoles = [
    { id: 'ADMIN', label: 'Administrador' },
    { id: 'PROFESOR', label: 'Profesor' },
    { id: 'ESTUDIANTE', label: 'Estudiante' }
  ];

  constructor(private readonly fb: FormBuilder) {
    this.userForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)
          ]
        ],
        confirmPassword: ['', [Validators.required]],
        roles: this.buildRoles()
      },
      {
        validators: [this.passwordsMatchValidator, this.atLeastOneRoleValidator]
      }
    );
  }

  buildRoles(): FormArray {
    return this.fb.array(
      this.availableRoles.map(() => this.fb.control(false))
    );
  }

  get fullName(): AbstractControl | null {
    return this.userForm.get('fullName');
  }

  get email(): AbstractControl | null {
    return this.userForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.userForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.userForm.get('confirmPassword');
  }

  get roles(): FormArray {
    return this.userForm.get('roles') as FormArray;
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  atLeastOneRoleValidator(control: AbstractControl): ValidationErrors | null {
    const rolesArray = control.get('roles') as FormArray;
    if (!rolesArray) return null;

    const atLeastOneSelected = rolesArray.controls.some(
      (roleControl) => roleControl.value
    );

    return atLeastOneSelected ? null : { noRoleSelected: true };
  }

  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  isValid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!control && control.valid && (control.touched || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    this.userForm.markAllAsTouched();

    if (this.userForm.invalid) {
      return;
    }

    const selectedRoles = this.roles.controls
      .map((control, index) => (control.value ? this.availableRoles[index].id : null))
      .filter((role) => role !== null);

    const formValue = {
      fullName: this.userForm.value.fullName,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      roles: selectedRoles
    };

    console.log('Usuario creado:', formValue);

    // Llamar tu servicio

  }
}