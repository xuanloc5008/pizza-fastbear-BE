import { SetMetadata } from '@nestjs/common';

export enum Role {
  ADMIN = 'admin',
  CLIENT = 'customer',
  EMPLOYEE = 'employee',
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
