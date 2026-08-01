export { AegisClient, AegisApiError } from "./client";
export type { AegisConfig, AegisUser, AegisWallet, AegisTransfer, AegisPaymentQuote, AegisEscrow, AegisKycSubmission, AegisHealthStatus, AegisError, AegisPaginatedResponse } from "./types";

export { IdentityModule } from "./modules/identity";
export { TransfersModule } from "./modules/transfers";
export { PaymentsModule } from "./modules/payments";
export { ComplianceModule } from "./modules/compliance";
export { BusinessModule } from "./modules/business";
export { HealthModule } from "./modules/health";

import { AegisClient } from "./client";
import { IdentityModule } from "./modules/identity";
import { TransfersModule } from "./modules/transfers";
import { PaymentsModule } from "./modules/payments";
import { ComplianceModule } from "./modules/compliance";
import { BusinessModule } from "./modules/business";
import { HealthModule } from "./modules/health";
import type { AegisConfig } from "./types";

export class AegisSDK {
  readonly client: AegisClient;
  readonly identity: IdentityModule;
  readonly transfers: TransfersModule;
  readonly payments: PaymentsModule;
  readonly compliance: ComplianceModule;
  readonly business: BusinessModule;
  readonly health: HealthModule;

  constructor(config: AegisConfig) {
    this.client = new AegisClient(config);
    this.identity = new IdentityModule(this.client);
    this.transfers = new TransfersModule(this.client);
    this.payments = new PaymentsModule(this.client);
    this.compliance = new ComplianceModule(this.client);
    this.business = new BusinessModule(this.client);
    this.health = new HealthModule(this.client);
  }

  /** Set the auth token for all subsequent requests. */
  setAuthToken(token: string): void {
    this.client.setAuthToken(token);
  }

  /** Clear the auth token. */
  clearAuthToken(): void {
    this.client.clearAuthToken();
  }
}

export default AegisSDK;
