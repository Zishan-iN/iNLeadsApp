import { Role } from "./role.model";

export class User{
   public id!: string;
   public name!: string;
   public email!:string;
   public password!: string;
   public profileImage!: File;
   public role!: Role;
   public token?: string;
   public createdAt!: Date;
   public updatedAt!: Date;
}