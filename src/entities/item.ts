export default class Item {
    constructor(
        readonly productId: String | number,
        readonly unitPrice: number,
        readonly quantity: number,
        readonly currency: string,
    ) {}
}
