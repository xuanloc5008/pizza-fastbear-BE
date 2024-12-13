import { OrderService } from './order.service';
import { UpdateOrderDto } from './dtos/updateorder.dto';
import { AddDishesToOrderDto } from './dtos/Dishes.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrders(e_id: number): Promise<unknown>;
    getAllOrders(e_id: string): Promise<unknown>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
    updateOrder(id: string, body: UpdateOrderDto): Promise<unknown>;
    getSalesman(store_id: number): Promise<any>;
    getShipper(store_id: number): Promise<any>;
    order(order_id: string, customer_id: string, body: AddDishesToOrderDto): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
}
