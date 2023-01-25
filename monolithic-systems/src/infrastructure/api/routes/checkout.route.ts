import express, { Request, Response } from "express";
import CheckoutRepository from "../../../modules/checkout/repository/checkout.repository";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import ClientAdmFacade from "../../../modules/client-adm/facade/client-adm.facade";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import ClientRepository from "../../../modules/client-adm/repository/client.repository";
import AddClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase";
import { AddClientInputDto } from "../../../modules/client-adm/usecase/add-client/add-client.usecase.dto";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StorageCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  const productFacade = ProductAdmFacadeFactory.create();
  const catalogFacade = StorageCatalogFacadeFactory.create();
  const checkoutRepository = new CheckoutRepository();
  const invoiceFacade = InvoiceFacadeFactory.create();
  const paymentFacade = PaymentFacadeFactory.create();
  const usecase = new PlaceOrderUseCase(
    clientFacade,
    productFacade,
    catalogFacade,
    checkoutRepository,
    invoiceFacade,
    paymentFacade
  );

  try {
    const checkoutDto = {
      clientId: req.body.clientId,
      products: req.body.products,
    };
    const output = await usecase.execute(checkoutDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
