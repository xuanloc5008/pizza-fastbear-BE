"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const sql = require("mssql");
let DatabaseService = class DatabaseService {
    constructor() {
        this.dbConfig = {
            user: 'sa',
            password: 'TrunTrun_TramCam3004',
            server: 'truntrun.ddns.net',
            database: 'BTL_2_DB',
            options: {
                encrypt: true,
                trustServerCertificate: true,
            },
        };
        this.initializePool();
    }
    async initializePool() {
        try {
            this.pool = await new sql.ConnectionPool(this.dbConfig).connect();
            console.log('Database connected');
        }
        catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }
    async query(queryString, params) {
        try {
            if (!this.pool) {
                await this.initializePool();
            }
            const request = this.pool.request();
            if (params) {
                params.forEach(param => {
                    request.input(param.name, param.value);
                });
            }
            const result = await request.query(queryString);
            return result.recordset;
        }
        catch (error) {
            console.error('Query execution failed:', { query: queryString, params, error });
            throw error;
        }
    }
    async onApplicationShutdown() {
        if (this.pool) {
            await this.pool.close();
            console.log('Database connection closed');
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
//# sourceMappingURL=database.service.js.map