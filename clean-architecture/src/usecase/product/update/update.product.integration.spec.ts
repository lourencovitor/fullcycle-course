import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

const input = {
  name: "Product 2",
  price: 150,
};

describe("Integration test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    // Arrange
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const productCreated = await createProductUseCase.execute({
      type: "a",
      name: "Product 2",
      price: 150,
    });

    // Act
    const result = await updateProductUseCase.execute({
      ...input,
      id: productCreated.id,
    });

    // Assert
    const output = {
      id: productCreated.id,
      name: input.name,
      price: input.price,
    };
    expect(result).toEqual(output);
  });
});
