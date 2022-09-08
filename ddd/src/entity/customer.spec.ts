import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id empty", () => {
    expect(() =>{
      const customer = new Customer("", "John");
    }).toThrowError("Id is required")
  })

  it("should throw error when name is empty", () => {
    expect(() =>{
      const customer = new Customer("123", "");
    }).toThrowError("Name is required")
  })

  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane")

    // Assert
    expect(customer.name).toBe("Jane")
  })

  it("should activate customer", () => {
    // Arrange
   const customer = new Customer("1", "Customer 1")
   const address = new Address("Street 1", 123, "13330-250", "São Paulo")
   customer.Address = address

   // Act
    customer.activate();

    // Assert
    expect(customer.isActive()).toBe(true)
  })

  it("should desactivate customer", () => {
    // Arrange
   const customer = new Customer("1", "Customer 1")

   // Act
    customer.desactivate();

    // Assert
    expect(customer.isActive()).toBe(false)
  })

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1")
       customer.activate();
    }).toThrowError('Address is mandatory to activate a customer')
  })
})