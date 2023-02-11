import Product from '../entities/product';

export default {
    jsonProducts: [
        new Product({
            desc: "Notebook", price: 15, height: 10, weight: 10,
            deep: 10, quantity: 1, width: 10, id: "1",
        }),
        new Product({
            desc: "Playstation 4", price: 15, height: 10, weight: 10,
            deep: 10, quantity: 1, width: 10, id: "2",
        }),
        new Product({
            desc: "Tv LED 4k", price: 15, height: 10, weight: 10,
            deep: 10, quantity: 1, width: 10, id: "3",
        }),
    ],
    jsonCoupons: [
        { id: "1", expired: false, desc: "VALE20", value: 20 },
        { id: "2", expired: true, desc: "VALE10", value: 10 },
    ]
}