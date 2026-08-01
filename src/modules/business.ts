import type { AegisClient } from "../client";
import type { AegisEscrow } from "../types";

export class BusinessModule {
  constructor(private client: AegisClient) {}

  /** List my business accounts. */
  async listAccounts(): Promise<unknown[]> {
    return this.client.get<unknown[]>("/api/v1/business/accounts");
  }

  /** Create a business account. */
  async createAccount(params: {
    businessName: string;
    businessType: string;
    country: string;
  }): Promise<unknown> {
    return this.client.post<unknown>("/api/v1/business/accounts", params);
  }

  /** Create an escrow. */
  async createEscrow(params: {
    businessAccountId: string;
    sellerAegisId: string;
    amount: string;
    currency: string;
    description: string;
  }): Promise<AegisEscrow> {
    return this.client.post<AegisEscrow>("/api/v1/business/escrow", params);
  }

  /** Release escrow funds. */
  async releaseEscrow(id: string): Promise<AegisEscrow> {
    return this.client.post<AegisEscrow>(`/api/v1/business/escrow/${id}/release`);
  }

  /** Create a referral code. */
  async createReferral(): Promise<{ code: string; expiresAt: string }> {
    return this.client.post<{ code: string; expiresAt: string }>("/api/v1/business/referrals");
  }
}
