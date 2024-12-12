import { DatabaseService } from '../database/database.service';
import { OrderDto } from './dtos/order.dto';
import { UpdateOrderDto } from './dtos/updateorder.dto';
export declare class OrderService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    placeOrder(body: OrderDto, c_id: string): Promise<{
        message: string;
    }>;
    getOrders(e_id: string, order_id: string): Promise<unknown>;
    getAllOrders(e_id: string): Promise<unknown>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
    updateOrder(id: string, body: UpdateOrderDto): Promise<unknown>;
}
