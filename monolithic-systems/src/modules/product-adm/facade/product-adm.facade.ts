import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  stockUsecase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsecase: UseCaseInterface;
  private _checkStockUsecase: UseCaseInterface;

  constructor(useCasesProps: UseCaseProps) {
    this._addUsecase = useCasesProps.addUseCase;
    this._checkStockUsecase = useCasesProps.stockUsecase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    // caso o dto do caso de uso for  != do dto da facade, converter o deto da facade para o dto do caso de uso
    return this._addUsecase.execute(input);
  }

  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input);
  }
}
