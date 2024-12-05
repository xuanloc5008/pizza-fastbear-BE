import { DatabaseService } from '../database/database.service';
import { OrderDto } from './dtos/order.dto';
export declare class OrderService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    placeOrder(body: OrderDto, c_id: string): Promise<unknown>;
}
