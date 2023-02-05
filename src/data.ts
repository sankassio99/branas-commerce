import { Product } from "./order";

export default {
    jsonProducts: [
        new Product("Notebook", 15 , 1 , "1"),
        new Product("Playstation 4", 25 , 1 , "2"),
        new Product("Tv LED 4k", 30 , 1 , "3"),
    ],
    jsonCoupons: [
        {id: "1", expired : false, desc : "VALE20", value : 20},
        {id: "2", expired : true, desc : "VALE10", value : 10},
    ]
}