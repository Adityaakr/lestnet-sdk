export interface RetryOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
};

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxAttempts, initialDelay, maxDelay, backoffFactor } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  let lastError: Error | null = null;
  let delay = initialDelay;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxAttempts) break;

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * backoffFactor, maxDelay);
    }
  }

  throw lastError;
}

export function isRpcError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  return "code" in error && "message" in error;
}

export function parseRpcError(error: unknown): { code: number; message: string } {
  if (isRpcError(error)) {
    return error as { code: number; message: string };
  }
  return { code: -32603, message: "Internal error" };
} 