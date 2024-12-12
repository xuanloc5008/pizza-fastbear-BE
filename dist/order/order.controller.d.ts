import { OrderService } from './order.service';
import { OrderDto } from './dtos/order.dto';
import { UpdateOrderDto } from './dtos/updateorder.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
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
