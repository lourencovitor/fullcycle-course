import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    // Arrange
    const payload = {
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "12345",
      },
    };

    // Act
    const response = await request(app).post("/customer").send(payload);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Street");
    expect(response.body.address.city).toBe("City");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("12345");
  });

  it("Should not create a customer", async () => {
    // Arrange
    const payload = { name: "John" };

    // Act
    const response = await request(app).post("/customer").send(payload);

    // Assert
    expect(response.status).toBe(500);
  });

  it("Should list a customer", async () => {
    // Arrange
    const payload = {
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "12345",
      },
    };
    const response = await request(app)
      .post("/customer")
      .send({ ...payload });
    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Jane",
        address: {
          street: "Street 2",
          city: "City2",
          number: 1234,
          zip: "12344",
        },
      });

    // Act
    const listResponse = await request(app).get("/customer").send();

    // Assert
    const customer = listResponse.body.customers[0];
    const customer2 = listResponse.body.customers[1];
    expect(response.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    expect(customer.name).toBe("John");
    expect(customer.address.street).toBe("Street");
    expect(customer2.name).toBe("Jane");
    expect(customer2.address.street).toBe("Street 2");
  });
});
