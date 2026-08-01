import type { AegisConfig, AegisError as IAegisError } from "./types";

export class AegisApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number,
    public correlationId?: string,
  ) {
    super(message);
    this.name = "AegisApiError";
  }
}

export class AegisClient {
  private baseUrl: string;
  private apiKey: string | undefined;
  private timeout: number;
  private bearerToken: string | undefined;

  constructor(config: AegisConfig) {
    this.baseUrl = config.gatewayUrl.replace(/\/$/, "");
    this.apiKey = config.apiKey;
    this.timeout = config.timeout ?? 30000;
  }

  /** Set the Bearer token for authenticated requests. */
  setAuthToken(token: string): void {
    this.bearerToken = token;
  }

  /** Clear the auth token. */
  clearAuthToken(): void {
    this.bearerToken = undefined;
  }

  /** Make an authenticated request to the Gateway. */
  async request<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string>,
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.bearerToken) {
      headers["Authorization"] = `Bearer ${this.bearerToken}`;
    }
    if (this.apiKey) {
      headers["X-API-Key"] = this.apiKey;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      const text = await response.text();
      let data: unknown;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }

      if (!response.ok) {
        const err = data as IAegisError;
        throw new AegisApiError(
          err?.code ?? "UNKNOWN_ERROR",
          err?.message ?? `HTTP ${response.status}`,
          response.status,
          err?.correlationId,
        );
      }

      return data as T;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /** GET request helper. */
  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>("GET", path, undefined, params);
  }

  /** POST request helper. */
  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("POST", path, body);
  }

  /** PUT request helper. */
  async put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PUT", path, body);
  }

  /** PATCH request helper. */
  async patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("PATCH", path, body);
  }

  /** DELETE request helper. */
  async delete<T>(path: string): Promise<T> {
    return this.request<T>("DELETE", path);
  }
}
