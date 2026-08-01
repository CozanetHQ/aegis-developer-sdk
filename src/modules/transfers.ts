import type { AegisClient } from "../client";
import type { AegisTransfer } from "../types";

export class TransfersModule {
  constructor(private client: AegisClient) {}

  /** List transfers for the authenticated user. */
  async list(limit = 20, offset = 0): Promise<AegisTransfer[]> {
    return this.client.get<AegisTransfer[]>("/api/v1/connect/AGS-748C1C7E54B5EB9D8C5C/transfers", { limit: String(limit), offset: String(offset) });
  }

  /** Get a single transfer by ID. */
  async get(id: string): Promise<AegisTransfer> {
    return this.client.get<AegisTransfer>(`/api/v1/connect/AGS-748C1C7E54B5EB9D8C5C/transfers/${id}`);
  }

  /** Create a new transfer. */
  async create(params: {
    sourceWallet: string;
    destinationAddress: string;
    amount: string;
    currency: string;
  }): Promise<AegisTransfer> {
    return this.client.post<AegisTransfer>("/api/v1/connect/AGS-748C1C7E54B5EB9D8C5C/transfers", params);
  }
}
