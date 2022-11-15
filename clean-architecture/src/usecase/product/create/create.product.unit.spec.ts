import CreateProductUseCase from "./create.product.usecase";

const input = {
  type: "a",
  name: "Product 1",
  price: 50,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    // Arrange
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    // Act
    const result = await createProductUseCase.execute(input);

    // Assert
    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };
    expect(result).toEqual(output);
  });

  it.each([
    { inputModified: { ...input, name: "" }, message: "Name is required" },
    {
      inputModified: { ...input, price: -1 },
      message: "Price must be greater than zero",
    },
    {
      inputModified: { ...input, type: "c" },
      message: "Product type not supported",
    },
  ])(
    "should throw an error when fields is missing with message error $message",
    async ({ inputModified, message }) => {
      // Arrange
      const productRepository = MockRepository();
      const createProductUseCase = new CreateProductUseCase(productRepository);

      // Act
      const resultPromise = createProductUseCase.execute(inputModified);

      // Assert
      expect(resultPromise).rejects.toThrow(message);
    }
  );
});
