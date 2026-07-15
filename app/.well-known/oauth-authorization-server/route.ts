import { NextResponse } from "next/server";

const domains = ["https://applefumi.xyz", "https://w.vreni.xyz"];

export async function GET() {
  const body = {
    issuer: domains[0],
    authorization_endpoint: `${domains[0]}/auth/authorize`,
    token_endpoint: `${domains[0]}/auth/token`,
    registration_endpoint: `${domains[0]}/auth/register`,
    scopes_supported: ["read"],
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code"],
    token_endpoint_auth_methods_supported: ["client_secret_basic"],
    agent_auth: {
      skill: "auth-md",
      register_uri: `${domains[0]}/auth/register`,
      identity_types_supported: ["anonymous"],
      anonymous: {
        credential_types_supported: ["api_key"],
        claim_uri: `${domains[0]}/.well-known/oauth-protected-resource`,
      },
    },
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
