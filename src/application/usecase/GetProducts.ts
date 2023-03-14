import Product from "../../domain/entities/product";
import IProductRepository from "../repository/iProductRepository";


export default class GetProducts {

    constructor(readonly productRepository : IProductRepository) {

        
    }

    async execute() : Promise<any> {
        // let output;
        // const products = await this.productRepository.getAll(id);

        // array.forEach(element => {
            
        // });
        //  {
        //     id: product.id,
        //     description: product.desc,
        //     price: product.price,
        // }
    }

}

type Output = {
	id: number,
	description: string,
	price: number
}[]