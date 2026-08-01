import type { AegisClient } from "../client";
import type { AegisHealthStatus } from "../types";

export class HealthModule {
  constructor(private client: AegisClient) {}

  /** Check the overall health of the Aegis platform. */
  async status(): Promise<AegisHealthStatus> {
    return this.client.get<AegisHealthStatus>("/api/v1/health");
  }
}
