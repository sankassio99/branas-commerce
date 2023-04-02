import IProductRepository from '../../application/repository/iProductRepository';
import data from '../data/data';
import Product from '../../domain/entities/Product';

export default class ProductRepositoryFake implements IProductRepository {
    constructor() {
    }

    getAll(): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }

    async save(product : Product) : Promise<void> {
        data.jsonProducts.push(product);
    }

    async get(idProduct: number): Promise<any> {
        const product = data.jsonProducts.find((element) => parseInt(element.id) == idProduct);
        if(!product){
            throw new Error(`Product ${idProduct} not found`);
        }
        return product;
    }
}