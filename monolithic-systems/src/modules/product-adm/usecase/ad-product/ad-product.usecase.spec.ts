import AddProductUsecase from "./ad-product.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Product usecase uni test", () => {
  it("Should add a product", async () => {
    // Arrange
    const productRepository = MockRepository();
    const usecase = new AddProductUsecase(productRepository);

    const input = {
      name: "Product 1",
      description: "Product description 1",
      purchasePrice: 100,
      stock: 10,
    };

    // Act
    const result = await usecase.execute(input);

    // Assert
    expect(productRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  });
});
