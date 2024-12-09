import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import * as sql from 'mssql';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
    private readonly dbConfig = {
        user: 'sa',
        password: 'TrunTrun_TramCam3004',
        server: 'truntrun.ddns.net',
        database: 'BTL_2_DB',
        options: {
            encrypt: true,
            trustServerCertificate: true,
        },
    };

    private pool: sql.ConnectionPool;

    constructor() {
        this.initializePool();
    }


    private async initializePool() {
        try {
            this.pool = await new sql.ConnectionPool(this.dbConfig).connect();
            console.log('Database connected');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }

    async query<T>(queryString: string, params?: { name: string; value: any }[]): Promise<T> {
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
            return result.recordset as T;
        } catch (error) {
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
}
