import type { AegisClient } from "../client";
import type { AegisKycSubmission } from "../types";

export class ComplianceModule {
  constructor(private client: AegisClient) {}

  /** Submit KYC documentation. */
  async submitKyc(params: {
    tier: "TIER_1" | "TIER_2" | "TIER_3";
    documentType: string;
    documentHash: string;
    country: string;
  }): Promise<AegisKycSubmission> {
    return this.client.post<AegisKycSubmission>("/api/v1/compliance/kyc", params);
  }

  /** List my KYC submissions. */
  async myKycSubmissions(): Promise<AegisKycSubmission[]> {
    return this.client.get<AegisKycSubmission[]>("/api/v1/compliance/kyc");
  }

  /** Check sanctions for a wallet or name. */
  async checkSanctions(params: {
    entityName: string;
    entityWallet?: string;
  }): Promise<{ status: string; matchScore: number }> {
    return this.client.post<{ status: string; matchScore: number }>("/api/v1/compliance/sanctions", params);
  }
}
