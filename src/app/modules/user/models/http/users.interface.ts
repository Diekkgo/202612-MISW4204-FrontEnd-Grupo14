import { Rol } from "../rol.model";
import { User } from "../user.model";

export interface UserWithRoles {
  user: User;
  roles: Rol[];
}

export interface UserReponse {
    users: UserWithRoles[];
    total: number;
}

export interface UserUpdateRolesModel {
  roles: number [];
}

export interface CreateUserModel {
  name: string;
  email: string;
  password: string;
  roles: number [];
}