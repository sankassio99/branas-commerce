import Product from "../../domain/entities/product";

export default interface IProductRepository {
    getProduct(idProduct : number): Promise<any>;

    save(product : Product) : Promise<void>;
}