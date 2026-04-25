import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";
import { UserService } from '../../services/user.service';
import { UserWithRoles } from '../../models/http/users.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  imports: [RouterModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit {

  private readonly userService = inject(UserService);
  users: UserWithRoles[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          this.users = response.users;
          
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
            title: "Error al cargar usuarios"
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
            title: `Error al cargar usuarios: ${error}`
          });
      }
    })
  }
}
