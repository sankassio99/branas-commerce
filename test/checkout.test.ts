import IOrderRepository from "../src/application/repository/iOrderRepository";
import ICurrencyGateway from "../src/application/gateway/ICurrencyGateway";
import CurrencyApiFake from "../src/infra/fakes/currencyApiFake";
import Checkout from "../src/application/usecase/Checkout";
import ICouponRepository from "../src/application/repository/iCouponRepository";
import IProductRepository from "../src/application/repository/iProductRepository";
import ProductRepositoryFake from "../src/infra/fakes/productRepositoryFake";
import CouponRepositoryFake from "../src/infra/fakes/couponRepositoryFake";
import OrderRepositoryFake from "../src/infra/fakes/orderRepositoryFake";
import { mock, verify, anyOfClass, instance } from "ts-mockito";
import Order from "../src/domain/entities/order";

let checkout: Checkout;
let currencyGateway: ICurrencyGateway;
let productRepository: IProductRepository;
let couponRepository: ICouponRepository;
let orderRepository: IOrderRepository;
let orderRepositoryMock : IOrderRepository;
beforeEach(() => {
    productRepository = new ProductRepositoryFake();
    couponRepository = new CouponRepositoryFake();
    orderRepositoryMock = mock(orderRepository);
    orderRepository = instance(orderRepositoryMock);
    currencyGateway = new CurrencyApiFake();
    checkout = new Checkout(
        currencyGateway,
        productRepository,
        couponRepository,
        orderRepository
    );
});

test("should save order in database persistence", async () => {
    // Ararnge
    const input = {
        cpf: "407.302.170-27",
        items: [],
    };
    // Act
    checkout.execute(input);
    //Arrange
    verify(orderRepositoryMock.save(anyOfClass(Order))).called();
    
});

// const orderRepository = class implements IOrderRepository {
//     getOrder(id: String): Promise<any> {
//         throw new Error("Method not implemented.");
//     }
//     save(order: Order): Promise<void> {
//         throw new Error("Method not implemented.");
//     }
// }
