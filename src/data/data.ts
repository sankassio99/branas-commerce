import Product from '../entities/product';

export default {
    jsonProducts: [
        new Product("Notebook", 15, 1, 10, 10, 10, 10, "1"),
        new Product("Playstation 4", 25, 1, 20, 20, 20, 20, "2"),
        new Product("Tv LED 4k", 30, 1, 30, 30, 30, 30, "3"),
    ],
    jsonCoupons: [
        { id: "1", expired: false, desc: "VALE20", value: 20 },
        { id: "2", expired: true, desc: "VALE10", value: 10 },
    ]
}