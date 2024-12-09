import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    console.log('Required Roles:', requiredRoles);
    if (!requiredRoles) {
      return true; 
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      throw new ForbiddenException('User role not found.');
    }

    const userRoles = Array.isArray(user.role)
      ? user.role.map((role) => role.trim()) 
      : [user.role.trim()]; 

    console.log('User Roles:', userRoles);

    const hasRole = userRoles.some((userRole) =>
      requiredRoles.map((role) => role.trim()).includes(userRole) 
    );

    if (!hasRole) {
      throw new ForbiddenException('You do not have permission');
    }

    return true;
  }
}
