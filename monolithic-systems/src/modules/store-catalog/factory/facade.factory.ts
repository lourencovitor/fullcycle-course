import StorageCatalogFacade from "../facade/storage-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-al-produts-usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StorageCatalogFacadeFactory {
  static create(): StorageCatalogFacade {
    const productRepository = new ProductRepository();
    const findUseCase = new FindProductUseCase(productRepository);
    const findAllUseCase = new FindAllProductsUsecase(productRepository);

    return new StorageCatalogFacade({ findUseCase, findAllUseCase });
  }
}
