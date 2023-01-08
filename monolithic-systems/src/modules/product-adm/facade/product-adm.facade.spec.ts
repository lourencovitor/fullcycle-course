import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/ad-product/ad-product.usecase";
import ProductAdmFacade from "./product-adm.facade";

describe("ProductAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    // Arrange
    const productFacade = ProductAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "Product 1",
      description: "Product description",
      purchasePrice: 10,
      stock: 10,
    };

    // Act
    await productFacade.addProduct(input);

    // Assert
    const product = await ProductModel.findOne({ where: { id: "1" } });
    expect(product).toBeDefined();
    expect(product.id).toEqual(input.id);
    expect(product.name).toEqual(input.name);
    expect(product.description).toEqual(input.description);
    expect(product.purchasePrice).toEqual(input.purchasePrice);
    expect(product.stock).toEqual(input.stock);
  });
});
