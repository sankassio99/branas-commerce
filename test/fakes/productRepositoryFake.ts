import IProductRepository from '../../src/application/gateway/iProductRepository';
import data from '../../src/infra/data/data';
import Product from '../../src/domain/entities/product';

class ProductRepositoryFake implements IProductRepository {
    constructor() {
    }

    async save(product : Product) : Promise<void> {
        data.jsonProducts.push(product);
    }

    async getProduct(idProduct: String): Promise<any> {
        return data.jsonProducts.find((element) => element.id == idProduct);
    }
}