import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    // Arrange
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    // Act
    const result = await createCustomerUseCase.execute(input);

    // Assert
    const output = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    };
    expect(result).toEqual(output);
  });

  it.each([
    { inputModified: { ...input, name: "" }, message: "Name is required" },
    {
      inputModified: { ...input, address: { ...input.address, street: "" } },
      message: "Street is required",
    },
  ])(
    "should throw an error when fields is missing with message error $message",
    async ({ inputModified, message }) => {
      // Arrange
      const customerRepository = MockRepository();
      const createCustomerUseCase = new CreateCustomerUseCase(
        customerRepository
      );

      // Act
      const resultPromise = createCustomerUseCase.execute(inputModified);

      // Assert
      expect(resultPromise).rejects.toThrow(message);
    }
  );
});
