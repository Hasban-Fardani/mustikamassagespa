# EmDash admin login

Mustika now registers EmDash's built-in Google OAuth provider as the first external login option. Passkey authentication remains available as a fallback because EmDash treats `authProviders` as additive login methods.

## Environment variables

Set these in the deployment environment. Do not commit their values:

```text
EMDASH_OAUTH_GOOGLE_CLIENT_ID=...
EMDASH_OAUTH_GOOGLE_CLIENT_SECRET=...
```

For local development, put them in `.env`. For Cloudflare Workers, configure the values as encrypted secrets or runtime variables in the deployment workflow.

## Google Cloud OAuth client

Create a Google OAuth client with application type **Web application**. Add the exact callback URL for every environment:

```text
http://localhost:4321/_emdash/api/auth/oauth/google/callback
https://YOUR-PRODUCTION-DOMAIN/_emdash/api/auth/oauth/google/callback
```

Replace `YOUR-PRODUCTION-DOMAIN` with the final public hostname before handing the site to the client. The hostname and protocol must match the URL used to open the admin panel.

The provider is enabled in [astro.config.mjs](../astro.config.mjs). EmDash's admin is available at `/_emdash/admin`.

## Why Google instead of email

EmDash's email login is a magic-link flow. It requires an active email-delivery provider, so enabling an email button without SMTP or another delivery integration would create a login path that cannot deliver the link. Google OAuth is ready for a client team that already uses Google accounts and does not require storing passwords in Mustika.

If the client later requires Google-only access, use an external identity layer such as Cloudflare Access with Google as its identity provider. That is a deployment-level decision and disables EmDash's built-in passkey, magic-link, and provider login flows; it should be configured only after the production domain and Cloudflare account are confirmed.
