import EventDispatcher from "../../../../@shared/event/event-dispatcher";
import Address from "../../../value-object/address";
import FirstCustomerCreatedHandler from "../handler/fisrt-customer-created.handler";
import SecondCustomerCreatedHandler from "../handler/second-customer-created.handler";
import SendLogWhenCustomerAddressChangedHandler from "../handler/send-log-when-customer-address-changed.handler";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new FirstCustomerCreatedHandler();
    const eventHandler2 = new SecondCustomerCreatedHandler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    const spyEventDispatcherNotify = jest.spyOn(eventDispatcher, "notify");
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    const customerFactory = new CustomerFactory(eventDispatcher);
    const customer = customerFactory.create("John");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBeUndefined();
    expect(spyEventDispatcherNotify).toHaveBeenCalled();
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should create a customer with an address", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerAddressChangedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventDispatcherNotify = jest.spyOn(eventDispatcher, "notify");
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    const customerFactory = new CustomerFactory(eventDispatcher);

    const address = new Address("Street", 1, "13330-250", "São Paulo");
    const customer = customerFactory.createWithAddress("John", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBe(address);
    expect(spyEventDispatcherNotify).toHaveBeenCalled();
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
