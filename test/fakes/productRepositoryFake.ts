import IProductRepository from '../../src/application/repository/iProductRepository';
import data from '../../src/infra/data/data';
import Product from '../../src/domain/entities/product';

export default class ProductRepositoryFake implements IProductRepository {
    constructor() {
    }

    async save(product : Product) : Promise<void> {
        data.jsonProducts.push(product);
    }

    async getProduct(idProduct: number): Promise<any> {
        const product = data.jsonProducts.find((element) => parseInt(element.id) == idProduct);
        if(!product){
            throw new Error(`Product ${idProduct} not found`);
        }
        return product;
    }
}