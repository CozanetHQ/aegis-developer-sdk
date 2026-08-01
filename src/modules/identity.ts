import type { AegisClient } from "../client";
import type { AegisUser } from "../types";

export class IdentityModule {
  constructor(private client: AegisClient) {}

  /** Get the currently authenticated user's profile. */
  async me(): Promise<AegisUser> {
    return this.client.get<AegisUser>("/api/v1/connect/AGS-D2C760D7DF2691722986/identity/me");
  }

  /** Register a new user. */
  async register(email: string, password: string): Promise<AegisUser> {
    return this.client.post<AegisUser>("/api/v1/connect/AGS-D2C760D7DF2691722986/identity/register", { email, password });
  }

  /** Login with email and password. */
  async login(email: string, password: string): Promise<{ token: string; user: AegisUser }> {
    return this.client.post<{ token: string; user: AegisUser }>("/api/v1/connect/AGS-D2C760D7DF2691722986/identity/login", { email, password });
  }

  /** Verify email with OTP code. */
  async verifyEmail(aegisId: string, code: string): Promise<{ verified: boolean }> {
    return this.client.post<{ verified: boolean }>("/api/v1/connect/AGS-D2C760D7DF2691722986/identity/verify-email", { aegisId, code });
  }

  /** Refresh the auth token. */
  async refreshToken(): Promise<{ token: string }> {
    return this.client.post<{ token: string }>("/api/v1/connect/AGS-D2C760D7DF2691722986/identity/refresh");
  }
}
