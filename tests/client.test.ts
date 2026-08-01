import { describe, it, expect, vi } from "vitest";
import { AegisClient, AegisApiError } from "../src/client";

describe("AegisClient", () => {
  it("constructs with config", () => {
    const client = new AegisClient({ gatewayUrl: "https://gateway.example.com" });
    expect(client).toBeDefined();
  });

  it("strips trailing slash from gateway URL", () => {
    const client = new AegisClient({ gatewayUrl: "https://gateway.example.com/" });
    // Internal check — the client should not have trailing slash
    expect((client as any).baseUrl).toBe("https://gateway.example.com");
  });

  it("setAuthToken stores token", () => {
    const client = new AegisClient({ gatewayUrl: "https://gateway.example.com" });
    client.setAuthToken("test-token");
    expect((client as any).bearerToken).toBe("test-token");
  });

  it("clearAuthToken removes token", () => {
    const client = new AegisClient({ gatewayUrl: "https://gateway.example.com" });
    client.setAuthToken("test-token");
    client.clearAuthToken();
    expect((client as any).bearerToken).toBeUndefined();
  });

  it("throws AegisApiError on non-ok response", async () => {
    const client = new AegisClient({ gatewayUrl: "https://gateway.example.com" });
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ code: "AUTH_REQUIRED", message: "Unauthorized" }), { status: 401 }),
    );
    await expect(client.get("/test")).rejects.toThrow(AegisApiError);
  });
});
