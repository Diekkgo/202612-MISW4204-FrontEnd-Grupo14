import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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

  availableRoles = [
    { id: 'ADMIN', label: 'Administrador' },
    { id: 'PROFESOR', label: 'Profesor' },
    { id: 'ESTUDIANTE', label: 'Estudiante' }
  ];

  constructor(private readonly fb: FormBuilder) {
    this.courseForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
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

  get name(): AbstractControl | null {
    return this.courseForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.courseForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.courseForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.courseForm.get('confirmPassword');
  }

  get roles(): FormArray {
    return this.courseForm.get('roles') as FormArray;
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
    const control = this.courseForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  isValid(controlName: string): boolean {
    const control = this.courseForm.get(controlName);
    return !!control && control.valid && (control.touched || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    this.courseForm.markAllAsTouched();

    if (this.courseForm.invalid) {
      return;
    }

    const selectedRoles = this.roles.controls
      .map((control, index) => (control.value ? this.availableRoles[index].id : null))
      .filter((role) => role !== null);

    const formValue = {
      name: this.courseForm.value.name,
      email: this.courseForm.value.email,
      password: this.courseForm.value.password,
      roles: selectedRoles
    };

    console.log('Usuario creado:', formValue);

    // Llamar tu servicio

  }
}
