import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.events";

export default class SecondCustomerCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    // tslint:disable-next-line:no-console
    console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
  }
}
