/**
 * @file contact.ts
 * @description Cloudflare Pages Edge Function for processing contact form submissions.
 * Routes to: /api/contact
 */

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  honeypot?: string;
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  try {
    const contentType = context.request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Invalid Content-Type. Expected application/json." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const body: ContactPayload = await context.request.json();

    // Anti-spam honeypot verification
    if (body.honeypot && body.honeypot.trim() !== "") {
      // Silently accept without action to thwart spambots
      return new Response(JSON.stringify({ success: true, received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();

    // Field validations
    if (!name || name.length < 2) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid name (minimum 2 characters)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!message || message.length < 10) {
      return new Response(
        JSON.stringify({ error: "Please provide a message with at least 10 characters." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Message dispatched successfully. Thank you for reaching out!",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Unable to parse request. Please verify inputs." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
