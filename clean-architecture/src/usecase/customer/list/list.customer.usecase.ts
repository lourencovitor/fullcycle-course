import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list.customer.dto";

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

// tslint:disable-next-line:max-classes-per-file
class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((item) => ({
        id: item.id,
        name: item.name,
        address: {
          street: item.Address.street,
          number: item.Address.number,
          zip: item.Address.zip,
          city: item.Address.city,
        },
      })),
    };
  }
}
