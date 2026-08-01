import { describe, it, expect } from "vitest";
import { AegisSDK } from "../src/index";

describe("AegisSDK", () => {
  it("constructs with all modules", () => {
    const sdk = new AegisSDK({ gatewayUrl: "https://aegis-gateway-roan.vercel.app" });
    expect(sdk.identity).toBeDefined();
    expect(sdk.transfers).toBeDefined();
    expect(sdk.payments).toBeDefined();
    expect(sdk.compliance).toBeDefined();
    expect(sdk.business).toBeDefined();
    expect(sdk.health).toBeDefined();
  });

  it("setAuthToken delegates to client", () => {
    const sdk = new AegisSDK({ gatewayUrl: "https://aegis-gateway-roan.vercel.app" });
    sdk.setAuthToken("test-token");
    expect((sdk.client as any).bearerToken).toBe("test-token");
  });
});
