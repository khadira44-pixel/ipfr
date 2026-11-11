/* eslint-disable no-console -- This module is the single approved console sink. */
/**
 * Minimal structured logger.
 *
 * Production emits one JSON object per line, which every log drain can parse.
 * Development stays human-readable. Sensitive keys are redacted recursively
 * before output, and email addresses are always masked.
 */
import { maskEmail } from "@/lib/utils";

type LogLevel = "debug" | "info" | "warn" | "error";
type LogFields = Record<string, unknown>;

const isProduction = process.env.NODE_ENV === "production";
const SENSITIVE_KEY = /(password|secret|token|authorization|cookie|email|phone|fullname|firstname|lastname)/i;
const MAX_REDACTION_DEPTH = 4;

function serializeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      ...(isProduction ? {} : { stack: error.stack }),
    };
  }

  return { message: String(error) };
}

function sanitizeString(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

function redact(key: string, value: unknown, depth = 0): unknown {
  if (depth > MAX_REDACTION_DEPTH) return "[max-depth]";

  if (typeof value === "string") {
    if (/email/i.test(key)) return maskEmail(value);
    if (SENSITIVE_KEY.test(key)) return "[redacted]";
    return sanitizeString(value);
  }

  if (value instanceof Error) return serializeError(value);

  if (Array.isArray(value)) {
    return value.map((item) => redact(key, item, depth + 1));
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([nestedKey, nestedValue]) => [
        nestedKey,
        redact(nestedKey, nestedValue, depth + 1),
      ]),
    );
  }

  return value;
}

function emit(level: LogLevel, event: string, fields: LogFields = {}): void {
  const safeFields = redact("fields", fields) as LogFields;

  if (isProduction) {
    const record = {
      level,
      event,
      timestamp: new Date().toISOString(),
      ...safeFields,
    };

    try {
      console[level](JSON.stringify(record));
    } catch {
      console[level](
        JSON.stringify({
          level: "error",
          event: "logger.serialization_failed",
          timestamp: new Date().toISOString(),
        }),
      );
    }
    return;
  }

  console[level](`[${level}] ${event}`, safeFields);
}

export const logger = {
  debug: (event: string, fields?: LogFields) => emit("debug", event, fields),
  info: (event: string, fields?: LogFields) => emit("info", event, fields),
  warn: (event: string, fields?: LogFields) => emit("warn", event, fields),
  error: (event: string, fields?: LogFields) => emit("error", event, fields),
};

export { serializeError };
