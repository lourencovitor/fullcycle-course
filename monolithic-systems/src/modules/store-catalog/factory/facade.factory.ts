import StoreCatalogFacade from "../facade/storage-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-al-produts-usecase";

import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findUseCase = new FindProductUseCase(productRepository);
    const findAllUseCase = new FindAllProductsUsecase(productRepository);

    const facade = new StoreCatalogFacade({
      findUseCase,
      findAllUseCase,
    });
    return facade;
  }
}
