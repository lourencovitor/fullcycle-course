import Invoice from "../domain/invoice";

export default interface InvoiceGateway {
  find(input: string): Promise<Invoice>;
  save(invoice: Invoice): Promise<void>;
}
