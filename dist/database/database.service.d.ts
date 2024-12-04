import { OnApplicationShutdown } from '@nestjs/common';
export declare class DatabaseService implements OnApplicationShutdown {
    private readonly dbConfig;
    private pool;
    constructor();
    private initializePool;
    query<T>(queryString: string, params?: {
        name: string;
        value: any;
    }[]): Promise<T>;
    onApplicationShutdown(): Promise<void>;
}
