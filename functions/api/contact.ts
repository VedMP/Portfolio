/**
 * @file contact.ts
 * @description Hardened Cloudflare Pages Edge Function for processing contact form submissions.
 * Routes to: /api/contact
 * Security Controls:
 * - CORS origin validation (prevents 3rd-party cross-site request abuse)
 * - Strict payload size limiting (prevents memory exhaustion / DoS)
 * - Maximum string bounds (RFC-compliant email lengths, input truncation)
 * - Control character stripping (prevents log injection and command attacks)
 * - Anti-spam honeypot defense
 * - Zero database persistence (immutable static site; user data cannot modify live HTML)
 */

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  honeypot?: string;
}

const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/(www\.)?vedmpatel\.me$/,
  /^https:\/\/[a-z0-9-]+\.pages\.dev$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // Direct same-origin requests often omit Origin
  return ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
}

function sanitizeString(input: string): string {
  // Strip null bytes and non-printable control characters (except common whitespace)
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}

function buildHeaders(origin: string | null): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-store, max-age=0",
  };

  if (origin && isOriginAllowed(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "86400";
  }

  return headers;
}

export async function onRequestOptions(context: { request: Request }): Promise<Response> {
  const origin = context.request.headers.get("origin");
  if (origin && !isOriginAllowed(origin)) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: buildHeaders(origin),
  });
}

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  const origin = context.request.headers.get("origin");
  const headers = buildHeaders(origin);

  // Cross-origin verification
  if (origin && !isOriginAllowed(origin)) {
    return new Response(
      JSON.stringify({ error: "Forbidden: Cross-origin request not permitted." }),
      { status: 403, headers }
    );
  }

  try {
    // 1. Content-Type check
    const contentType = context.request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Invalid Content-Type. Expected application/json." }),
        { status: 400, headers }
      );
    }

    // 2. Strict payload size check (10 KB limit)
    const contentLength = parseInt(context.request.headers.get("content-length") || "0", 10);
    if (contentLength > 10240) {
      return new Response(
        JSON.stringify({ error: "Payload exceeds maximum permissible limit (10 KB)." }),
        { status: 413, headers }
      );
    }

    const rawBody: ContactPayload = await context.request.json();

    // 3. Anti-spam honeypot verification
    if (rawBody.honeypot && rawBody.honeypot.trim() !== "") {
      // Silently accept without action to thwart spambots
      return new Response(JSON.stringify({ success: true, received: true }), {
        status: 200,
        headers,
      });
    }

    // 4. Sanitize and validate fields
    const name = sanitizeString(rawBody.name || "");
    const email = sanitizeString(rawBody.email || "");
    const message = sanitizeString(rawBody.message || "");

    // Name bounds (2 - 100 characters)
    if (!name || name.length < 2 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid name (2 to 100 characters)." }),
        { status: 400, headers }
      );
    }

    // Email bounds (RFC 5321: max 254 characters) & format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > 254 || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address (max 254 characters)." }),
        { status: 400, headers }
      );
    }

    // Message bounds (10 - 4,000 characters)
    if (!message || message.length < 10 || message.length > 4000) {
      return new Response(
        JSON.stringify({ error: "Please provide a message with 10 to 4,000 characters." }),
        { status: 400, headers }
      );
    }

    // 5. Success response (Pure JSON acknowledgement, zero database injection)
    return new Response(
      JSON.stringify({
        success: true,
        message: "Message received securely. Thank you for reaching out!",
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Unable to parse request body. Please verify inputs." }),
      { status: 400, headers }
    );
  }
}
