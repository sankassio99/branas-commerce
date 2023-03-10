import Item from "./item";
import Product from "./product";
import Cpf from "./cpf";
import ICurrencyGateway from "../../application/gateway/iCurrencyGateway";

export default class Order {
    items: Array<Item> = [];
    discountCoupon?: number;
    cpf : Cpf;
    currencyApi : ICurrencyGateway;
	freight: number;

    constructor(cpf : string, currencyApi : ICurrencyGateway, freight? : number , readonly uuid? : string) {
        this.cpf = new Cpf(cpf);
        this.currencyApi = currencyApi;
        this.freight = freight ?? 0;
    }
 
    getOrderDetails() {
        return {
            products: this.items
        }
    }

    addItems(products: Product[]) {
        products.forEach(product => {
            this.items.push(new Item(product.id, product.price, product.quantity, product.currency));
        });
    }

    addItem(product: Product, quantity : number) {
        if(quantity < 1) throw new Error("Invalid quantity");
        this.items.push(new Item(product.id, product.price, quantity, product.currency));
    }

    getTotal(): number {
        let total: number = 0;

        this.items.forEach(product => {
            total += product.unitPrice * product.quantity * this.currencyApi.getCurreny(product.currency);
        });
        if (this.discountCoupon) {
            var discountValue = total * (this.discountCoupon / 100)
            total = total - discountValue;
        }

        return total;
    }

    addDiscountCoupon(discountCoupon: number) {
        this.discountCoupon = discountCoupon;
    }

}