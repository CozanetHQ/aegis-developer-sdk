# @cozanethq/aegis-sdk

Public TypeScript SDK for the AEGIS platform. Third-party developers use this SDK to integrate AEGIS functionality (identity, wallets, transfers, payments, compliance) into their own applications.

## Installation

```bash
npm install @cozanethq/aegis-sdk
```

## Quick Start

```typescript
import { AegisSDK } from "@cozanethq/aegis-sdk";

const aegis = new AegisSDK({
  gatewayUrl: "https://aegis-gateway-roan.vercel.app",
});

// Authenticate
aegis.setAuthToken("your-bearer-token");

// Get user profile
const user = await aegis.identity.me();

// Create a transfer
const transfer = await aegis.transfers.create({
  sourceWallet: "0x...",
  destinationAddress: "0x...",
  amount: "1000000000000000000",
  currency: "BNB",
});

// Get a payment quote
const quote = await aegis.payments.quote({
  amount: "1000000000000000000",
  currency: "BNB",
  useCznDiscount: true,
});

// Submit KYC
const kyc = await aegis.compliance.submitKyc({
  tier: "TIER_1",
  documentType: "PASSPORT",
  documentHash: "sha256-hash",
  country: "NG",
});
```

## Architecture

- **Talks ONLY to the Gateway** — never directly to engines
- **Bearer token auth** — set via `setAuthToken()`
- **Full TypeScript types** — all responses are typed
- **Error handling** — throws `AegisApiError` with code, message, statusCode, correlationId
- **Timeout support** — configurable per-request timeout (default 30s)

## Modules

| Module | Description |
|--------|-------------|
| `identity` | User registration, login, profile, email verification |
| `transfers` | Create and track crypto transfers |
| `payments` | Get payment quotes and status |
| `compliance` | KYC submission, sanctions screening |
| `business` | Business accounts, escrow, referrals |
| `health` | Platform health check |

## License

MIT
