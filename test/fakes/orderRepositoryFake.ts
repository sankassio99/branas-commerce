import IOrderRepository from '../../src/application/repository/iOrderRepository';
import data from '../../src/infra/data/data';
import Order from '../../src/domain/entities/order';

class OrderRepositoryFake implements IOrderRepository {
    constructor() {
    }

    async save(order : Order) : Promise<void> {
        data.jsonOrders.push(order);
    }

    async getOrder(id: String): Promise<any> {
        
    }
}