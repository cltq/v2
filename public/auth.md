# auth.md

## Agent Registration

This site supports agent-based access via API keys.

### Domains

- **Primary**: https://applefumi.xyz
- **Alternate**: https://w.vreni.xyz

### Registration

To register as an agent, obtain an API key through the registration endpoint:

- **Register**: `POST https://applefumi.xyz/auth/register`
- **Auth Server Metadata**: `https://applefumi.xyz/.well-known/oauth-authorization-server`
- **Protected Resource Metadata**: `https://applefumi.xyz/.well-known/oauth-protected-resource`

### Authentication

Include your API key in the `Authorization` header:

```
Authorization: Bearer <your-api-key>
```

### Supported Methods

- API Key authentication via `Authorization` header

### Rate Limiting

Agent requests are subject to rate limiting. Excessive requests may result in temporary access restrictions.

### Contact

For questions about agent access, open an issue at https://github.com/cltq/v2
