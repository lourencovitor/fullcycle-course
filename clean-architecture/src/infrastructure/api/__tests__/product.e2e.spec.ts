import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    // Arrange
    const payload = {
      type: "a",
      name: "Product 1",
      price: 100,
    };

    // Act
    const response = await request(app).post("/product").send(payload);
    const response2 = await request(app)
      .post("/product")
      .send({ name: "Product 2", type: "b", price: 200 });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.id).not.toBeUndefined();
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100);
    expect(response2.status).toBe(200);
    expect(response2.body.id).not.toBeUndefined();
    expect(response2.body.name).toBe("Product 2");
    expect(response2.body.price).toBe(400);
  });

  it("Should not create a product", async () => {
    // Arrange
    const payload = { name: "Product 1" };

    // Act
    const response = await request(app).post("/product").send(payload);

    // Assert
    expect(response.status).toBe(500);
  });

  it("Should list a product", async () => {
    // Arrange
    const payload = {
      type: "a",
      name: "Product 1",
      price: 100,
    };
    const response = await request(app).post("/product").send(payload);
    const response2 = await request(app)
      .post("/product")
      .send({ name: "Product 2", type: "b", price: 200 });

    // Act
    const listResponse = await request(app).get("/product").send();

    // Assert
    const product = listResponse.body.products[0];
    const product2 = listResponse.body.products[1];
    expect(response.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(100);
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(400);
  });
});
