export interface AegisUser {
  id: string;
  aegisId: string;
  email: string;
  status: "ACTIVE" | "SUSPENDED" | "LOCKED";
  kycStatus: "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
  wallets: AegisWallet[];
  createdAt: string;
}

export interface AegisWallet {
  chain: "ETH" | "BNB" | "TRON";
  address: string;
  label?: string;
}

export interface AegisTransfer {
  id: string;
  aegisId: string;
  sourceWallet: string;
  destinationAddress: string;
  amount: string;
  currency: string;
  status: "PENDING" | "PROCESSING" | "CONFIRMED" | "FAILED";
  txHash?: string;
  fee: string;
  createdAt: string;
}

export interface AegisPaymentQuote {
  id: string;
  amount: string;
  currency: string;
  fee: string;
  total: string;
  cznDiscount?: string;
  expiresAt: string;
}

export interface AegisEscrow {
  id: string;
  businessAccountId: string;
  buyerAegisId: string;
  sellerAegisId: string;
  amount: string;
  currency: string;
  status: "CREATED" | "FUNDED" | "RELEASED" | "DISPUTED" | "REFUNDED" | "EXPIRED";
  description: string;
  expiresAt: string;
}

export interface AegisKycSubmission {
  id: string;
  tier: "TIER_1" | "TIER_2" | "TIER_3";
  status: "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED" | "EXPIRED";
  documentType: string;
  country: string;
  submittedAt: string;
}

export interface AegisHealthStatus {
  status: "ok" | "degraded";
  services: Record<string, "up" | "unreachable">;
}

export interface AegisError {
  code: string;
  message: string;
  statusCode: number;
  correlationId?: string;
}

export interface AegisPaginatedResponse<T> {
  data: T[];
  hasMore: boolean;
  total?: number;
}

export interface AegisConfig {
  gatewayUrl: string;
  apiKey?: string;
  timeout?: number;
}
