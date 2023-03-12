import Item from "./item";
import Product from "./product";
import Cpf from "./cpf";
import CurrencyTable from "./CurrencyTable";

export default class Order {
    items: Array<Item> = [];
    discountCoupon?: number;
    cpf: Cpf;
    freight: number;
    readonly code: string;

    constructor(
        cpf: string,
        readonly currencyTable: CurrencyTable = new CurrencyTable(),
        freight?: number,
        readonly uuid?: string,
        readonly date?: Date,
    ) {
        this.cpf = new Cpf(cpf);
        this.freight = freight ?? 0;
        this.code = this.generateCode();
    }

    private generateCode(): string {
        return `${this.date?.getFullYear}${new String(this.uuid).padStart(8, "0")}`;
    }

    getOrderDetails() {
        return {
            products: this.items,
        };
    }

    addItems(products: Product[]) {
        products.forEach((product) => {
            this.items.push(
                new Item(
                    product.id,
                    product.price,
                    product.quantity,
                    product.currency
                )
            );
        });
    }

    addItem(product: Product, quantity: number) {
        if (quantity < 1) throw new Error("Invalid quantity");
        this.items.push(
            new Item(product.id, product.price, quantity, product.currency)
        );
    }

    getTotal(): number {
        let total: number = 0;

        this.items.forEach((product) => {
            total +=
                product.unitPrice *
                product.quantity *
                this.currencyTable.getCurrency(product.currency);
        });
        if (this.discountCoupon) {
            var discountValue = total * (this.discountCoupon / 100);
            total = total - discountValue;
        }

        return total;
    }

    addDiscountCoupon(discountCoupon: number) {
        this.discountCoupon = discountCoupon;
    }

    getCode(): string {
        return this.code;
    }
}
