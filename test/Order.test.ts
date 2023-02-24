import Order from '../src/entities/order';
import Product from '../src/entities/product';

test("Should create a order with 3 products", function () {
    // Ararnge
    let product1 = new Product({desc: "",price: 100.0, quantity:  1,width: 100, height: 30,deep:  10, weight: 10, id: "1"});
    let product2 = new Product({desc: "",price: 100.0, quantity:  1,width: 100, height: 30,deep:  10, weight: 10, id: "2"});
    let product3 = new Product({desc: "",price: 100.0, quantity:  1,width: 100, height: 30,deep:  10, weight: 10, id: "3"});

    let products = [product1, product2, product3];

    // Act
    let order = new Order(products);

    // Assert
    var res = order.getOrderDetails();
    expect(res.products.length).toBe(3);
});

test("Should calculate total value", function () {
    // Ararnge
    let product1 = new Product({desc: "",price: 100.0, quantity:  1,width: 100, height: 30,deep:  10, weight: 10, id: "1"});
    let product2 = new Product({desc: "",price: 100.0, quantity:  1,width: 100, height: 30,deep:  10, weight: 10, id: "2"});
    let product3 = new Product({desc: "",price: 100.0, quantity:  3,width: 100, height: 30,deep:  10, weight: 10, id: "3"});
    let products = [product1, product2, product3];

    // Act
    let order = new Order(products);

    // Assert
    let expectTotalValue = 500;
    let totalValue = order.getTotal();
    expect(totalValue).toBe(expectTotalValue);
});

test("Should get total value with discount after associate coupon", function () {
    // Ararnge
    let product1 = new Product({desc: "",price: 100.0, quantity:  1,width: 100, height: 30,deep:  10, weight: 10, id: "1"});
    let product2 = new Product({desc: "",price: 100.0, quantity:  1,width: 100, height: 30,deep:  10, weight: 10, id: "2"});
    let product3 = new Product({desc: "",price: 100.0, quantity:  3,width: 100, height: 30,deep:  10, weight: 10, id: "3"});
    let products = [product1, product2, product3];

    let discountCoupon : number = 10; 

    // Act
    let order = new Order(products);
    order.addDiscountCoupon(discountCoupon);

    // Assert
    let expectTotalValue = 450;
    let totalValue = order.getTotal();
    expect(totalValue).toBe(expectTotalValue);
});