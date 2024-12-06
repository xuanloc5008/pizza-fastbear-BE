"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const database_service_1 = require("./database/database.service");
const jwt_1 = require("@nestjs/jwt");
const order_module_1 = require("./order/order.module");
const menu_module_1 = require("./menu/menu.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, jwt_1.JwtModule.register({
                global: true,
                secret: 'duongthanhtuss',
                signOptions: { expiresIn: '1h' },
            }), order_module_1.OrderModule, menu_module_1.MenuModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, database_service_1.DatabaseService],
        exports: [database_service_1.DatabaseService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map