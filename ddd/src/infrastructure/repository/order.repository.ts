import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-respository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }

  async update(entity: Order): Promise<void> {
    const order = await OrderModel.findOne({
      where: { id: entity.id },
      include: ["items"],
      rejectOnEmpty: true,
    });

    const destroyOrderItemsPromise = order.items.map((item) =>
      OrderItemModel.destroy({
        where: {
          id: item.id,
        },
      })
    );
    await Promise.all(destroyOrderItemsPromise);

    const addOrderItemsPromise = entity.items.map((item) => {
      const { id, name, price, productId, quantity } = item;
      return OrderItemModel.create({
        id,
        name,
        price,
        product_id: productId,
        quantity,
        order_id: entity.id,
      });
    });
    await Promise.all(addOrderItemsPromise);

    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const order = new Order(
      id,
      orderModel.customer_id,
      orderModel.items.map<OrderItem>(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )
    );

    return order;
  }

  async findAll(): Promise<Order[]> {
    const ordersDb = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    const orders = ordersDb.map((order) => {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map((item) => {
          return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          );
        })
      );
    });

    return orders;
  }
}
