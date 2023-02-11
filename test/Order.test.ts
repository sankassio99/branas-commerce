import Order from '../src/entities/order';
import Product from '../src/entities/product';

test("Should create a order with 3 products", function () {
    // Ararnge
    let product1 = new Product("",100.0,1,100,30,10,10);
    let product2 = new Product("",250.0,1,20,10,20,10);
    let product3 = new Product("",50.0,3,200,10,20,30);


    let products = [product1, product2, product3];

    // Act
    let order = new Order(products);

    // Assert
    var res = order.getOrderDetails();
    expect(res.products.length).toBe(3);
});

test("Should calculate total value", function () {
    // Ararnge
    let product1 = new Product("",100.0,1,100,30,10,10);
    let product2 = new Product("",250.0,1,20,10,20,10);
    let product3 = new Product("",50.0,3,200,10,20,30);
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
    let product1 = new Product("",100.0,1,100,30,10,10);
    let product2 = new Product("",250.0,1,20,10,20,10);
    let product3 = new Product("",50.0,3,200,10,20,30);
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