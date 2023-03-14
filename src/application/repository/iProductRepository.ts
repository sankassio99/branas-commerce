import Product from "../../domain/entities/product";

export default interface IProductRepository {
    get(id : number): Promise<any>;
    getAll(): Promise<Product[]>;
    save(product : Product) : Promise<void>;
}