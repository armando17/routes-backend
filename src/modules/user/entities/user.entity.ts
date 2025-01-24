import { User } from '@prisma/client';
//import { Roles } from '@modules/app/app.roles';

export default class UserEntity implements User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  password: string;
  roles: any;
  createdAt: Date;
  updatedAt: Date;
  document: string;
  phone: string;
}
