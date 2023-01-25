import express, { Request, Response } from "express";
import InvoiceRepository from "../../../modules/invoice/repository/invoice.repository";
import FindInvoiceUseCase from "../../../modules/invoice/usecase/find-invoice/find.invoice.usecase";
import GenerateInvoiceUseCase from "../../../modules/invoice/usecase/generate-invoice/generate-invoice.usecase";

export const invoiceRoute = express.Router();

invoiceRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new GenerateInvoiceUseCase(new InvoiceRepository());
  try {
    const invoicetDto = {
      id: req.body.id,
      name: req.body.name,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      items: req.body.items,
    };
    const output = await usecase.execute(invoicetDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
  const usecase = new FindInvoiceUseCase(new InvoiceRepository());
  try {
    const output = await usecase.execute({ id: req.params.id });
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
