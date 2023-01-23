import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from "./payment.facade.interface";

export class PaymentFacade implements PaymentFacadeInterface {
  constructor(private readonly processPaymentUseCase: UseCaseInterface) {}

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return await this.processPaymentUseCase.execute(input);
  }
}
