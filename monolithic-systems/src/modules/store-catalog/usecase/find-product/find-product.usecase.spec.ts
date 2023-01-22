import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  salesPrice: 100,
});

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe("find a product usecase unit test", () => {
  it("should find a product", async () => {
    const ProductRepository = MockRepository();
    const usecase = new FindProductUseCase(ProductRepository);
    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(ProductRepository.find).toHaveBeenCalled();
    expect(result.id).toEqual("1");
    expect(result.name).toEqual("Product 1");
    expect(result.description).toEqual("Description 1");
    expect(result.salesPrice).toEqual(100);
  });
});
