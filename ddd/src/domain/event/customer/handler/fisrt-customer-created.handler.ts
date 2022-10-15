import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.events";

export default class FirstCustomerCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    // tslint:disable-next-line:no-console
    console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
  }
}
