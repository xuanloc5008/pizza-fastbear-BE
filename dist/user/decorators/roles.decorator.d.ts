export declare enum Role {
    ADMIN = "admin",
    CLIENT = "customer",
    EMPLOYEE = "employee"
}
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
