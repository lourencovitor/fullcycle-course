import Order from "./order"
import OrderItem from "./order_item"


describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() =>{
      const order = new Order("","123",[])
    }).toThrowError("Id is required")
  })

  it("should throw error when customerId is empty", () => {
    expect(() =>{
      const order = new Order("123","",[])
    }).toThrowError("CustomerId is required")
  })

  it("should throw error when items are empty", () => {
    expect(() =>{
      const order = new Order("123","123",[])
    }).toThrowError("Items are required")
  })

  it("should calculate total", () => {
    // Arrange
    const item = new OrderItem("1", "Item 1", 100, "p1", 2)
    const item2 = new OrderItem("1", "Item 2", 200, "p2", 2)
    const order = new Order("1", "c1", [item])
    const order2 = new Order("1", "c1", [item, item2])

    // Act
    const total = order.total()
    const total2 = order2.total()

    // Assert
    expect(total).toBe(200)
    expect(total2).toBe(600)
  })

  it("should throw if the item qtd is less or equal 0", () => {
    expect(() => {
      const item = new OrderItem("1", "Item 1", 100, "p1", 0)
      const order = new Order("1", "c1", [item])
    }).toThrowError('Quantity must be greater than 0')
  })
})