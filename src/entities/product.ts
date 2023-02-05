export default class Product {
    id: String;
    desc: String;
    price: number;
    quantity: number;

    constructor(desc: String, price: number, quantity: number, id?: String) {
        if (id) {
            this.id = id;
        } else {
            this.id = "13";
        }
        this.desc = desc;
        this.price = price;
        this.quantity = quantity;
    }
}