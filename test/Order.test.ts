import Order from '../src/domain/entities/order';
import Product from '../src/domain/entities/product';
import crypto from "crypto";
import CurrencyApiFake  from "./fakes/currencyApiFake";
import ICurrencyGateway  from "../src/application/gateway/iCurrencyGateway";

let currencyApi : ICurrencyGateway;

beforeEach(function () {
	currencyApi = new CurrencyApiFake();
});

test('should create a empty order', () => {
    const uuid = crypto.randomUUID();
    const order = new Order("746.971.314-01", currencyApi , uuid);
    expect(order.getTotal()).toBe(0);
});

test("Should create a order with 3 products", function () {
    // Ararnge
    let product1 = new Product({ desc: "", price: 100.0, quantity: 1, width: 100, height: 30, deep: 10, weight: 10, id: "1" });
    let product2 = new Product({ desc: "", price: 100.0, quantity: 1, width: 100, height: 30, deep: 10, weight: 10, id: "2" });
    let product3 = new Product({ desc: "", price: 100.0, quantity: 1, width: 100, height: 30, deep: 10, weight: 10, id: "3" });

    let products = [product1, product2, product3];

    // Act
    let order = new Order("746.971.314-01",currencyApi);
    order.addItems(products);

    // Assert
    var res = order.getOrderDetails();
    expect(res.products.length).toBe(3);
});

test("Should calculate total value", function () {
    // Ararnge
    let product1 = new Product({ desc: "", price: 100.0, quantity: 1, width: 100, height: 30, deep: 10, weight: 10, id: "1" });
    let product2 = new Product({ desc: "", price: 100.0, quantity: 1, width: 100, height: 30, deep: 10, weight: 10, id: "2" });
    let product3 = new Product({ desc: "", price: 100.0, quantity: 3, width: 100, height: 30, deep: 10, weight: 10, id: "3" });
    let products = [product1, product2, product3];

    // Act
    let order = new Order("746.971.314-01",currencyApi);
    order.addItems(products);

    // Assert
    let expectTotalValue = 500;
    let totalValue = order.getTotal();
    expect(totalValue).toBe(expectTotalValue);
});

test("Should get total value with discount after associate coupon", function () {
    // Ararnge
    let product1 = new Product({ desc: "", price: 100.0, quantity: 1, width: 100, height: 30, deep: 10, weight: 10, id: "1" });
    let product2 = new Product({ desc: "", price: 100.0, quantity: 1, width: 100, height: 30, deep: 10, weight: 10, id: "2" });
    let product3 = new Product({ desc: "", price: 100.0, quantity: 3, width: 100, height: 30, deep: 10, weight: 10, id: "3" });
    let products = [product1, product2, product3];

    let discountCoupon: number = 10;

    // Act
    let order = new Order("746.971.314-01",currencyApi);
    order.addItems(products);
    order.addDiscountCoupon(discountCoupon);

    // Assert
    let expectTotalValue = 450;
    let totalValue = order.getTotal();
    expect(totalValue).toBe(expectTotalValue);
});

test('should not create a Order with invalid CPF', () => {
    const uuid = crypto.randomUUID();
    expect(() => new Order("666.666.666-11",currencyApi, uuid)).toThrow(new Error("invalid cpf"));
});

test("Should not add item with quantity invalid", function () {
    // Ararnge
    let product = new Product({ desc: "", price: 100.0, quantity: -1, width: 100, height: 30, deep: 10, weight: 10, id: "1" });

    // Act
    let order = new Order("746.971.314-01",currencyApi);

    // Assert
    expect(() => order.addItem(product, -10)).toThrow(new Error("invalid quantity"));
});

test("Should add item with dolar currency and convert total to real currency", function () {
    // Ararnge
    const dolarCurrency = 3;
    let product = new Product({ desc: "", price: 100.0, quantity: 1, width: 100, height: 30, deep: 10, weight: 10, currency : "USD" , id: "1" });

    // Act
    let order = new Order("746.971.314-01",currencyApi);
    order.addItem(product, 1);

    // Assert
    const expectValue = product.price * dolarCurrency;
    expect(order.getTotal()).toBe(expectValue);
});