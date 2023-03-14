import GetProducts from "../src/application/usecase/GetProducts";
import ProductRepositoryFake from "../src/infra/fakes/productRepositoryFake";
import sinon from "sinon";
import data from "../src/infra/data/data";

beforeEach(()=>{


})

test('Should get all products', async () => {
    // Arrange
    const stubproductRepository = sinon.stub(ProductRepositoryFake.prototype, "getAll").resolves(
		data.jsonProducts
	);
    let productRepository = new ProductRepositoryFake();
    const getProducts = new GetProducts(productRepository);
    // Act
    let allProducts : any[] = await getProducts.execute();
    // Assert
    expect(allProducts.length).toBe(data.jsonProducts.length);
    expect(stubproductRepository.calledOnce).toBeTruthy();
});