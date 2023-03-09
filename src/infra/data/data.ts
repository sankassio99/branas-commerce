import Order from '../../domain/entities/order';
import Product from '../../domain/entities/product';
import CurrencyApiFake from '../../../test/fakes/currencyApiFake';

var product = new Product({
    desc: "Notebook", price: 15, height: 10, weight: 10,
    deep: 10, quantity: 1, width: 10, id: "1",
})

export default {
    jsonProducts: [
        new Product({
            desc: "Notebook", price: 15, height: 10, weight: 3,
            deep: 10, quantity: 1, width: 5, id: "1",
        }),
        new Product({
            desc: "Playstation 4", price: 25, height: 10, weight: 8,
            deep: 10, quantity: 1, width: 10, id: "2",
        }),
        new Product({
            desc: "Tv LED 4k", price: 30, height: 5, weight: 5,
            deep: 10, quantity: 1, width: 1, id: "3",
        }),
    ],
    jsonOrders: [new Order("407.302.170-27",new CurrencyApiFake())],
    jsonCoupons: [
        { id: "VALE20", expired: false, desc: "VALE20", value: 20 },
        { id: "VALE10", expired: true, desc: "VALE10", value: 10 },
    ]
}