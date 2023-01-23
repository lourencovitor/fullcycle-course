import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address";
import Invoice from "../domain/invoice";
import Product from "../domain/product";

import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";

export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: [{ model: ProductModel }],
    });

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode,
      }),
      items: invoice.products.map(
        (product) =>
          new Product({
            id: new Id(product.id),
            name: product.name,
            price: product.price,
          })
      ),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
  async save(invoice: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        products: invoice.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
      },
      {
        include: [{ model: ProductModel }],
      }
    );
  }
}
