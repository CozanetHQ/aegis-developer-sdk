import { AegisSDK } from "@cozanethq/aegis-sdk";

async function main() {
  const aegis = new AegisSDK({
    gatewayUrl: "https://aegis-gateway-roan.vercel.app",
    timeout: 15000,
  });

  // Register a new user
  const user = await aegis.identity.register("user@example.com", "password");
  console.log("Registered:", user.aegisId);

  // Login to get a token
  const { token } = await aegis.identity.login("user@example.com", "password");
  aegis.setAuthToken(token);

  // Get profile
  const me = await aegis.identity.me();
  console.log("Profile:", me.email, me.wallets);

  // Check platform health
  const health = await aegis.health.status();
  console.log("Platform:", health.status);
  for (const [engine, status] of Object.entries(health.services)) {
    console.log(`  ${engine}: ${status}`);
  }
}

main().catch(console.error);
