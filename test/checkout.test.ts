import Order from "../src/entities/order";
import Product from "../src/entities/product";


test('should save order in database persistence', async () => {
    // Ararnge
    let product1 = new Product({ desc: "", price: 100.0, quantity: 1, width: 100, height: 30, deep: 10, weight: 10, id: "1" });
    let product2 = new Product({ desc: "", price: 100.0, quantity: 1, width: 100, height: 30, deep: 10, weight: 10, id: "2" });
    let product3 = new Product({ desc: "", price: 100.0, quantity: 3, width: 100, height: 30, deep: 10, weight: 10, id: "3" });
    let products = [product1, product2, product3];

    // Act
    let order = new Order(products);

    //Arrange
    
    
});