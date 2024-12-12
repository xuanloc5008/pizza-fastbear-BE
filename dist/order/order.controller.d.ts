import { OrderService } from './order.service';
import { OrderDto } from './dtos/order.dto';
import { UpdateOrderDto } from './dtos/updateorder.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
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
