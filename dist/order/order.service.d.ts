import { DatabaseService } from '../database/database.service';
import { OrderDto } from './dtos/order.dto';
import { UpdateOrderDto } from './dtos/updateorder.dto';
export declare class OrderService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    placeOrder(body: OrderDto, c_id: string): Promise<{
        message: string;
    }>;
    getOrders(c_id: string): Promise<{
        message: string;
    }>;
    getAllOrders(): Promise<{
        message: string;
    }>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
    updateOrder(id: string, body: UpdateOrderDto): Promise<unknown>;
}
