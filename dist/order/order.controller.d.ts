import { OrderService } from './order.service';
import { OrderDto } from './dtos/order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    placeOrder(body: OrderDto, c_id: string): Promise<unknown>;
    getOrders(c_id: string): Promise<unknown>;
    getAllOrders(): Promise<unknown>;
}
