import express, { Request, Response } from "express";
import ICurrencyGateway from "./application/gateway/iCurrencyGateway";
import Order from "./domain/entities/order";
import CurrencyApiFake from "./infra/fakes/currencyApiFake";
import Checkout from "./application/usecase/Checkout";
import IProductRepository from "./application/repository/iProductRepository";
import ICouponRepository from "./application/repository/iCouponRepository";
import IOrderRepository from "./application/repository/iOrderRepository";
import ProductRepositoryFake from "./infra/fakes/productRepositoryFake";
import CouponRepositoryFake from "./infra/fakes/couponRepositoryFake";
import OrderRepositoryFake from "./infra/fakes/orderRepositoryFake";
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