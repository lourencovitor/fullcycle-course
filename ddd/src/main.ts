import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import OrderItem from "./domain/checkout/entity/order_item";
import Order from "./domain/checkout/entity/order";

const customer = new Customer("123", "Vitor Silva");

const address = new Address("Rua dois", 2, "1234-678", "São Paulo");

customer.Address = address;
customer.activate();
// ID

// Objeto - Entidade
const item1 = new OrderItem("1", "item 1", 10, "p1", 1);
const item2 = new OrderItem("2", "item 2", 15, "p2", 2);

const order = new Order("1", "123", [item1, item2]);
