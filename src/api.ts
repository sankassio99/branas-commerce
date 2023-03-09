import express, { Request, Response } from "express";
import ICurrencyGateway from "./application/gateway/iCurrencyGateway";
import data from "./infra/data/data";
import Item from "./domain/entities/item";
import Order from "./domain/entities/order";
import Product from "./domain/entities/product";
import CurrencyApiFake from "../test/fakes/currencyApiFake";
import Checkout from "./application/usecase/Checkout";
import IProductRepository from "./application/repository/iProductRepository";
import ICouponRepository from "./application/repository/iCouponRepository";
import IOrderRepository from "./application/repository/iOrderRepository";
import ProductRepositoryFake from "../test/fakes/productRepositoryFake";
import CouponRepositoryFake from "../test/fakes/couponRepositoryFake";
import OrderRepositoryFake from "../test/fakes/orderRepositoryFake";
const app = express();
app.use(express.json());

let checkout: Checkout;
let currencyGateway: ICurrencyGateway;
let productRepository: IProductRepository;
let couponRepository: ICouponRepository;
let orderRepository: IOrderRepository;
let output: Output;

app.post("/checkout", async function (req: Request, res: Response) {
    productRepository = new ProductRepositoryFake();
    couponRepository = new CouponRepositoryFake();
    orderRepository = new OrderRepositoryFake();
    currencyGateway = new CurrencyApiFake();

    checkout = new Checkout(
        currencyGateway,
        productRepository,
        couponRepository,
        orderRepository
    );

    try {
      const output = await checkout.execute(req.body);
      res.json(output);
    } catch (e: any) {
      console.log("----------------------");
      console.log(e);
      console.log("----------------------");
      res.status(422).json({
        message: e.message
      });
    }
});

app.listen(3000);

type Output = {
    message?: string;
    total?: number;
    order?: Order;
    freight: number;
};

type ProductReq = {
    id: string;
    quantity: number;
};

function getDicountValue(couponName: string): number | undefined {
    let coupon = data.jsonCoupons.find((element) => element.desc == couponName);

    if (coupon?.expired) {
        output.message = "Discount coupon invalid";
        return;
    }
    return coupon?.value;
}

function findProductById(id: string): Product | undefined {
    return data.jsonProducts.find((element) => element.id == id);
}

function calculeFreight(item: Product): number {
    // Valor do Frete = distância (km) * volume (m3) * (densidade/100)
    const distance = 1000;
    const volume = calculeVolume(item);
    const density = calculeDesity(volume, item);
    return (distance * volume * density) / 1000;
}


function calculeVolume(product: Product): number {
    // Exemplos de volume ocupado (cubagem)
    //   - Camera: H 20cm x D 15 cm x  W 10 cm = 30 m3
    const volume = (product.height * product.deep * product.width) / 1000;
    return volume;
}
function calculeDesity(volume: number, product: Product) {
    // Camera: 1kg / 0,003 m3 = 333kg/m3
    return product.weight / volume;
}
