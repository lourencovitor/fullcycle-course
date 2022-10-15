import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendLogWhenCustomerAddressChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const id = event.eventData.id;
    const name = event.eventData.name;
    const address = event.eventData.Address.toString();
    // tslint:disable-next-line:no-console
    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${address}`
    );
  }
}
