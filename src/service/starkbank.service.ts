import * as starkbank from "starkbank";
import { Logger, Order } from "@vendure/core";
import { StarkbankConfig } from "../interfaces/starkbank";

export class StarkBankService {
  public starkbank = starkbank;

  constructor(
    private starkbankConfig: StarkbankConfig
  ) {
    const project = new starkbank.Project(this.starkbankConfig);
    this.starkbank.setUser(project);
  }

  async createPixPayment(order: Order) {
    try {
      const payment = await this.starkbank.invoice.create([
        {
          amount: order.subTotalWithTax,
          taxId: (order.customer?.customFields as any)?.cpf ?? '14354762048',
          name: order.billingAddress.fullName,
          expiration: 123456789,
          fine: 2.5,
          interest: 1.3,
          descriptions: order.lines.map(line => ({
            key: line.order.code,
            value: line.adjustments.map(item => item.description).join(', ')
          }))
        } as any,
      ]);

      return payment[0];
    } catch (error) {
      Logger.error(`Erro ao criar pagamento PIX: ${error}`);
      throw error;
    }
  }

  async getPixPaymentStatus(transactionId: string) {
    try {
      const payment = await starkbank.invoice.get(transactionId);
      return payment;
    } catch (error) {
      Logger.error(`Erro ao obter status do pagamento PIX: ${error}`);
      throw error;
    }
  }
}
