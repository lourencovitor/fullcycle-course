import Customer from "../../../entity/customer";
import EventDispatcher from "../../@shared/event-dispatcher";
import { v4 as uuid } from "uuid";
import CustomerCreatedEvent from "../customer-created.events";
import Address from "../../../entity/address";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class CustomerFactory {
  private _eventDispatcher: EventDispatcher;

  constructor(eventDispatcher: EventDispatcher) {
    this._eventDispatcher = eventDispatcher;
  }

  public create(name: string): Customer {
    const customer = new Customer(uuid(), name);
    this._eventDispatcher.notify(new CustomerCreatedEvent(customer));
    return customer;
  }

  public createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    this._eventDispatcher.notify(new CustomerAddressChangedEvent(customer));
    return customer;
  }
}
