import { NextResponse } from "next/server";

const baseUrl = "https://applefumi.xyz";

export async function GET() {
  const body = {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/auth/authorize`,
    token_endpoint: `${baseUrl}/auth/token`,
    registration_endpoint: `${baseUrl}/auth/register`,
    scopes_supported: ["read"],
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code"],
    token_endpoint_auth_methods_supported: ["client_secret_basic"],
    agent_auth: {
      skill: "auth-md",
      register_uri: `${baseUrl}/auth/register`,
      identity_types_supported: ["anonymous"],
      anonymous: {
        credential_types_supported: ["api_key"],
        claim_uri: `${baseUrl}/.well-known/oauth-protected-resource`,
      },
    },
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
