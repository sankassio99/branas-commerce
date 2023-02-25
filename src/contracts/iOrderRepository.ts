import Order from "../entities/order";

export default interface IOrderRepository {
    getOrder(id : String): Promise<any>;
    save(order : Order) : Promise<void>;
}