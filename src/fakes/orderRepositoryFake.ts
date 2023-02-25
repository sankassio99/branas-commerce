import IOrderRepository from '../contracts/iOrderRepository';
import data from '../data/data';
import Order from '../entities/order';

class OrderRepositoryFake implements IOrderRepository {
    constructor() {
    }

    async save(order : Order) : Promise<void> {
        data.jsonOrders.push(order);
    }

    async getOrder(id: String): Promise<any> {
        
    }
}