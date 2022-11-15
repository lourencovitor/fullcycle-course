import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street 1", 123, "Zip", "City")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe",
  new Address("Street 2", 456, "Zip", "City 2")
);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test for listing customer use cases", () => {
  it("should list a customer", async () => {
    // Arrange
    const repository = MockRepository();
    const usecase = new ListCustomerUseCase(repository);

    // Act
    const output = await usecase.execute({});

    // Assert
    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.Address.street);
    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.Address.street);
  });
});
