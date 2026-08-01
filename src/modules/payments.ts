import type { AegisClient } from "../client";
import type { AegisPaymentQuote } from "../types";

export class PaymentsModule {
  constructor(private client: AegisClient) {}

  /** Get a payment quote. */
  async quote(params: {
    amount: string;
    currency: string;
    useCznDiscount?: boolean;
  }): Promise<AegisPaymentQuote> {
    return this.client.post<AegisPaymentQuote>("/api/v1/connect/AGS-FE9B4C5D72A1E8F3B6C7/payments/quote", params);
  }

  /** Get payment status. */
  async status(id: string): Promise<{ status: string; txHash?: string }> {
    return this.client.get<{ status: string; txHash?: string }>(`/api/v1/connect/AGS-FE9B4C5D72A1E8F3B6C7/payments/${id}/status`);
  }
}
