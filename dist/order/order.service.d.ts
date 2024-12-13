import { DatabaseService } from '../database/database.service';
import { UpdateOrderDto } from './dtos/updateorder.dto';
import { AddDishesToOrderDto } from './dtos/Dishes.dto';
export declare class OrderService {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    placeOrder(store_id: string, c_id: string): Promise<any>;
    getOrders(salesman_id: number): Promise<unknown>;
    getAllOrders(e_id: string): Promise<unknown>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
    updateOrder(id: string, body: UpdateOrderDto): Promise<unknown>;
    getSalesman(strore_id: number): Promise<any>;
    getShipper(store_id: number): Promise<any>;
    addSalesmanandShipper(order_id: number, salesman_id: number, shipper_id: number): Promise<{
        message: string;
    }>;
    addDishesToOrderContain(order_id: number, dto: AddDishesToOrderDto): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
    order(store_id: string, customer_id: string, dto: AddDishesToOrderDto): Promise<{
        message: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
    }>;
}
