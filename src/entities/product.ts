import { v4 as uuidv4 } from 'uuid';

export default class Product {
    id: String;
    desc: String;
    price: number;
    quantity: number;
    width: number;
    height: number;
    deep: number;
    weight: number;

    constructor({ desc, price,
        quantity, width, height,
        deep: length, weight, id }: {
            desc: String, price: number,
            quantity: number, width: number, height: number,
            deep: number, weight: number, id?: String
        }) {
        if (id) {
            this.id = id;
        } else {
            this.id = uuidv4();
        }
        this.desc = desc;
        this.price = price;
        this.quantity = quantity;
        this.width = width;
        this.height = height;
        this.deep = length;
        this.weight = weight;
    }
}