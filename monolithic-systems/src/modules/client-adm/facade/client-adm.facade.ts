import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  AddClientFacadeInputDto,
  ClientAdmFacadeInterface,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from "./client-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _addUsecase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._addUsecase = useCaseProps.addUseCase;
    this._findUsecase = useCaseProps.findUseCase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUsecase.execute(input);
  }

  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    return await this._findUsecase.execute(input);
  }
}
