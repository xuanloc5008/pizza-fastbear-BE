import { OrderService } from './order.service';
import { UpdateOrderDto } from './dtos/updateorder.dto';
import { AddDishesToOrderDto } from './dtos/Dishes.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    placeOrder(store_id: string, c_id: string): Promise<{
        result: unknown;
        message: string;
    } | {
        message: string;
        result?: undefined;
    }>;
    getOrders(e_id: number): Promise<unknown>;
    getAllOrders(e_id: string): Promise<unknown>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
    updateOrder(id: string, body: UpdateOrderDto): Promise<unknown>;
    getSalesman(store_id: number): Promise<{
        message: string;
        salesman_id: any;
    } | {
        message: string;
        salesman_id?: undefined;
    }>;
    getShipper(store_id: number): Promise<{
        message: string;
        shipper_id: any;
    } | {
        message: string;
        shipper_id?: undefined;
    }>;
    addSalesmanAndShipper(order_id: number, salesman_id: number, shipper_id: number): Promise<{
        message: string;
    }>;
    addDishToOrderContain(order_id: number, body: AddDishesToOrderDto): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
}
