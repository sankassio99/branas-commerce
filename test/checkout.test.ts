import IOrderRepository from "../src/application/repository/iOrderRepository";
import ICurrencyGateway from "../src/application/gateway/ICurrencyGateway";
import CurrencyApiFake from "../src/infra/fakes/currencyApiFake";
import Checkout from "../src/application/usecase/Checkout";
import ICouponRepository from "../src/application/repository/iCouponRepository";
import IProductRepository from "../src/application/repository/iProductRepository";
import ProductRepositoryFake from "../src/infra/fakes/productRepositoryFake";
import CouponRepositoryFake from "../src/infra/fakes/couponRepositoryFake";
import OrderRepositoryFake from "../src/infra/fakes/orderRepositoryFake";
import Order from "../src/domain/entities/order";
import sinon from "sinon";

let checkout: Checkout;
let currencyGateway: ICurrencyGateway;
let productRepository: IProductRepository;
let couponRepository: ICouponRepository;
let orderRepository: IOrderRepository;

beforeEach(() => {
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
});

test("should save order in database persistence", async () => {
    // use spy when you need verify if function is called 
	const spyOrderRepository = sinon.spy(OrderRepositoryFake.prototype, "save");

    // Ararnge
    const input = {
        cpf: "407.302.170-27",
        items: [],
    };
    // Act
    await checkout.execute(input);
    //Arrange
    expect(spyOrderRepository.calledOnce).toBeTruthy();
    
});

test("Should create a order with 1 product in dolar value", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ id: 4, quantity: 1 },
		]
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(2997);
});

// const orderRepository = class implements IOrderRepository {
//     getOrder(id: String): Promise<any> {
//         throw new Error("Method not implemented.");
//     }
//     save(order: Order): Promise<void> {
//         throw new Error("Method not implemented.");
//     }
// }
