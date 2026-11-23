import fs from 'fs';
import path from 'path';

// Exact 10 categories required by the Composio assignment
const categories = [
  {
    name: "CRM and Sales",
    apps: [
      { name: "Salesforce", url: "https://www.salesforce.com", docs: "https://developer.salesforce.com/docs", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2", access: "Gated / Enterprise Approval", mcp: "Community MCP Available", build: "Medium", blockers: ["Mandatory Connected App approval", "Complex permission sets", "API limits on lower tiers"] },
      { name: "HubSpot", url: "https://www.hubspot.com", docs: "https://developers.hubspot.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Daily API request caps", "Private apps require admin access"] },
      { name: "Pipedrive", url: "https://www.pipedrive.com", docs: "https://developers.pipedrive.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Rate limit 40-80 req/sec", "Webhook payload signature validation"] },
      { name: "Zoho CRM", url: "https://www.zoho.com/crm/", docs: "https://www.zoho.com/crm/developer/docs/", api: "REST", breadth: "Core Endpoints", auth: "OAuth2", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "Medium", blockers: ["Domain-specific DC endpoints (.com, .eu, .in)", "Short token TTL (1 hr)"] },
      { name: "Close", url: "https://www.close.com", docs: "https://developer.close.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Requires paid subscription for production key"] },
      { name: "Apollo.io", url: "https://www.apollo.io", docs: "https://apolloio.github.io/apollo-api-docs/", api: "REST", breadth: "Core Endpoints", auth: "API Key", access: "Self-Serve", mcp: "No MCP Support", build: "High", blockers: ["Strict credit consumption per search", "Hourly query rate throttling"] },
      { name: "Gong", url: "https://www.gong.io", docs: "https://help.gong.io/hc/en-us/articles/360042456452-Gong-API", api: "REST", breadth: "Read-Only / Basic", auth: "Basic Auth", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Low", blockers: ["Enterprise-only tier requirement", "Manual admin API credential provisioning"] },
      { name: "Outreach", url: "https://www.outreach.io", docs: "https://api.outreach.io/api/v2/docs", api: "REST + Webhooks", breadth: "Core Endpoints", auth: "OAuth2", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Medium", blockers: ["Strict app review process", "Complex multi-tenant workspace routing"] },
      { name: "Attio", url: "https://attio.com", docs: "https://developers.attio.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Dynamic object schema requires runtime introspection"] },
      { name: "Folk", url: "https://folk.app", docs: "https://folk.app/integrations", api: "REST", breadth: "Core Endpoints", auth: "API Key", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Early-stage API surface", "Limited batch endpoints"] }
    ]
  },
  {
    name: "Support and Helpdesk",
    apps: [
      { name: "Zendesk", url: "https://www.zendesk.com", docs: "https://developer.zendesk.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Strict rate limits (700 req/min)", "Sandbox requires Enterprise Suite"] },
      { name: "Intercom", url: "https://www.intercom.com", docs: "https://developers.intercom.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["App approval required for global marketplace distribution"] },
      { name: "Freshdesk", url: "https://freshdesk.com", docs: "https://developers.freshdesk.com/api/", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Plan-based rate limits (50-200 req/min)", "Strict custom field validation"] },
      { name: "Front", url: "https://front.com", docs: "https://dev.frontapp.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Webhook listener timeout 5s", "OAuth refresh token rotation"] },
      { name: "Help Scout", url: "https://www.helpscout.com", docs: "https://developer.helpscout.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Client Credentials grant requires Plus plan"] },
      { name: "Gorgias", url: "https://www.gorgias.com", docs: "https://developers.gorgias.com", api: "REST + Webhooks", breadth: "Core Endpoints", auth: "Basic Auth", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Requires base64 encoded API key", "E-commerce store linkage needed"] },
      { name: "Kustomer", url: "https://www.kustomer.com", docs: "https://developer.kustomer.com", api: "REST + Webhooks", breadth: "Core Endpoints", auth: "API Key", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Medium", blockers: ["Enterprise plan required", "Strict role-based API token permissions"] },
      { name: "Crisp", url: "https://crisp.chat", docs: "https://docs.crisp.chat/api/v1/", api: "REST + Webhooks", breadth: "Core Endpoints", auth: "Basic Auth", access: "Self-Serve", mcp: "No MCP Support", build: "Medium", blockers: ["Two-part identifier/key credential pair", "RTM socket protocol for live chat"] },
      { name: "LiveChat", url: "https://www.livechat.com", docs: "https://developers.livechat.com/docs", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Developer Console registration mandatory"] },
      { name: "Kayako", url: "https://www.kayako.com", docs: "https://developer.kayako.com", api: "REST", breadth: "Read-Only / Basic", auth: "Basic Auth", access: "Waitlist / Contact Sales", mcp: "No MCP Support", build: "Low", blockers: ["Legacy REST interface", "No active public sandbox"] }
    ]
  },
  {
    name: "Communications and Messaging",
    apps: [
      { name: "Slack", url: "https://slack.com", docs: "https://api.slack.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Granular OAuth scope matrix", "Bot vs User token permission split"] },
      { name: "Discord", url: "https://discord.com", docs: "https://discord.com/developers/docs", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Privileged gateway intents required for message content"] },
      { name: "Telegram", url: "https://telegram.org", docs: "https://core.telegram.org/bots/api", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Zero friction self-serve bot token", "30 msg/sec global broadcast cap"] },
      { name: "WhatsApp Business", url: "https://business.whatsapp.com", docs: "https://developers.facebook.com/docs/whatsapp/cloud-api", api: "REST + Webhooks", breadth: "Core Endpoints", auth: "OAuth2", access: "Gated / Enterprise Approval", mcp: "Community MCP Available", build: "Medium", blockers: ["Meta business verification mandatory", "Pre-approved 24-hr message templates"] },
      { name: "Twilio", url: "https://www.twilio.com", docs: "https://www.twilio.com/docs", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "Basic Auth", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Account SID + Auth Token pairing", "A2P 10DLC campaign registration for SMS"] },
      { name: "Microsoft Teams", url: "https://www.microsoft.com/en-us/microsoft-teams", docs: "https://learn.microsoft.com/en-us/graph/teams-concept-overview", api: "REST + Webhooks", breadth: "Core Endpoints", auth: "OAuth2", access: "Self-Serve", mcp: "Community MCP Available", build: "Medium", blockers: ["Microsoft Entra ID tenant admin consent required"] },
      { name: "SendGrid", url: "https://sendgrid.com", docs: "https://docs.sendgrid.com/api-reference", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Mandatory sender domain authentication (SPF/DKIM)"] },
      { name: "Zoom", url: "https://zoom.us", docs: "https://developers.zoom.us/docs/", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Server-to-Server OAuth migration required"] },
      { name: "Postmark", url: "https://postmarkapp.com", docs: "https://postmarkapp.com/developer", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Separate Server and Account tokens"] },
      { name: "Resend", url: "https://resend.com", docs: "https://resend.com/docs/api-reference", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Modern developer-first API, zero friction"] }
    ]
  },
  {
    name: "Marketing, Ads, Email and Social",
    apps: [
      { name: "Mailchimp", url: "https://mailchimp.com", docs: "https://mailchimp.com/developer/marketing/api/", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["DC prefix in API endpoint (e.g. us19)", "Strict member status transitions"] },
      { name: "ActiveCampaign", url: "https://www.activecampaign.com", docs: "https://developers.activecampaign.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Account-specific base URL required"] },
      { name: "Klaviyo", url: "https://www.klaviyo.com", docs: "https://developers.klaviyo.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Date-versioned API revisions (revision header required)"] },
      { name: "Buffer", url: "https://buffer.com", docs: "https://buffer.com/developers/api", api: "REST", breadth: "Core Endpoints", auth: "OAuth2", access: "Self-Serve", mcp: "No MCP Support", build: "Medium", blockers: ["Channel-specific post payload constraints"] },
      { name: "Hootsuite", url: "https://www.hootsuite.com", docs: "https://developer.hootsuite.com", api: "REST + Webhooks", breadth: "Core Endpoints", auth: "OAuth2", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Medium", blockers: ["Developer partner application review needed"] },
      { name: "Meta Ads Manager", url: "https://www.facebook.com/business/ads", docs: "https://developers.facebook.com/docs/marketing-apis", api: "REST", breadth: "Read-Only / Basic", auth: "OAuth2", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Low", blockers: ["App Review for ads_management permission", "Business verification required"] },
      { name: "Google Ads", url: "https://ads.google.com", docs: "https://developers.google.com/google-ads/api/docs/start", api: "gRPC", breadth: "Read-Only / Basic", auth: "OAuth2", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Low", blockers: ["Developer Token application review", "Standard vs Test access tiers"] },
      { name: "LinkedIn Marketing Solutions", url: "https://business.linkedin.com/marketing-solutions", docs: "https://learn.microsoft.com/en-us/linkedin/marketing/", api: "REST", breadth: "Read-Only / Basic", auth: "OAuth2", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Low", blockers: ["Development vs Production access gating", "Rigid ad account permissions"] },
      { name: "Twitter / X API", url: "https://x.com", docs: "https://developer.x.com/en/docs", api: "REST", breadth: "Read-Only / Basic", auth: "OAuth2 & API Key", access: "Gated / Enterprise Approval", mcp: "Community MCP Available", build: "Low", blockers: ["Severe pricing paywalls ($100-$5000/mo) for write access", "Heavily restricted free tier"] },
      { name: "Brevo", url: "https://www.brevo.com", docs: "https://developers.brevo.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Account domain validation required for outbound email"] }
    ]
  },
  {
    name: "Ecommerce",
    apps: [
      { name: "Shopify", url: "https://www.shopify.com", docs: "https://shopify.dev/docs/api", api: "GraphQL", breadth: "Full / Extensive", auth: "OAuth2", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Protected customer data scopes approval for public apps"] },
      { name: "WooCommerce", url: "https://woocommerce.com", docs: "https://woocommerce.github.io/woocommerce-rest-api-docs/", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "Basic Auth", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Consumer Key + Secret over HTTPS", "WordPress host firewall/Cloudflare blocks"] },
      { name: "Magento / Adobe Commerce", url: "https://business.adobe.com/products/magento/magento-commerce.html", docs: "https://developer.adobe.com/commerce/webapi/", api: "REST", breadth: "Core Endpoints", auth: "OAuth2", access: "Self-Serve", mcp: "No MCP Support", build: "Medium", blockers: ["Heavy enterprise XML/JSON schema", "Complex token exchange"] },
      { name: "BigCommerce", url: "https://www.bigcommerce.com", docs: "https://developer.bigcommerce.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Store hash in URL path", "X-Auth-Token header"] },
      { name: "Stripe Billing", url: "https://stripe.com/billing", docs: "https://docs.stripe.com/api", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Gold standard developer DX, zero blockers"] },
      { name: "Square", url: "https://squareup.com", docs: "https://developer.squareup.com/docs", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Location ID required in multiple transaction endpoints"] },
      { name: "Medusa", url: "https://medusajs.com", docs: "https://docs.medusajs.com", api: "REST", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Open source headless commerce, clean developer API"] },
      { name: "Printful", url: "https://www.printful.com", docs: "https://developers.printful.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Store ID header required", "Mockup generation asynchronous polling"] },
      { name: "ShipStation", url: "https://www.shipstation.com", docs: "https://www.shipstation.com/docs/api/", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "Basic Auth", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["API key & secret base64 encoded", "Rate limit 40 req/min"] },
      { name: "Swell", url: "https://www.swell.is", docs: "https://developers.swell.is", api: "REST", breadth: "Core Endpoints", auth: "Basic Auth", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Client vs Backend key scoping"] }
    ]
  },
  {
    name: "Data, SEO and Scraping",
    apps: [
      { name: "Bright Data", url: "https://brightdata.com", docs: "https://docs.brightdata.com", api: "REST", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Zone-based credentials", "Cost per GB bandwidth tracking"] },
      { name: "SerpApi", url: "https://serpapi.com", docs: "https://serpapi.com/search-api", api: "REST", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Query param api_key pass", "Prepaid search quota"] },
      { name: "Ahrefs", url: "https://ahrefs.com", docs: "https://ahrefs.com/api/documentation", api: "REST", breadth: "Core Endpoints", auth: "API Key", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Medium", blockers: ["Requires Enterprise plan for API v3 access", "Heavy cost per API unit"] },
      { name: "Semrush", url: "https://www.semrush.com", docs: "https://developer.semrush.com", api: "REST", breadth: "Core Endpoints", auth: "API Key", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Medium", blockers: ["Requires Business plan ($499/mo) to unlock API"] },
      { name: "Apify", url: "https://apify.com", docs: "https://docs.apify.com/api/v2", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Actor run lifecycle asynchronous polling required"] },
      { name: "ScraperAPI", url: "https://www.scraperapi.com", docs: "https://www.scraperapi.com/documentation/", api: "REST", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Proxy gateway format, simple agent integration"] },
      { name: "Clearbit", url: "https://clearbit.com", docs: "https://dashboard.clearbit.com/docs", api: "REST + Webhooks", breadth: "Core Endpoints", auth: "API Key", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Medium", blockers: ["HubSpot acquisition transition gating", "Credit rate limits"] },
      { name: "ZoomInfo", url: "https://www.zoominfo.com", docs: "https://api-docs.zoominfo.com", api: "REST", breadth: "Read-Only / Basic", auth: "OAuth2", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Low", blockers: ["Strict Enterprise-only contract", "Manual IP whitelisting"] },
      { name: "Similarweb", url: "https://www.similarweb.com", docs: "https://support.similarweb.com/hc/en-us/articles/360000755878-API-Overview", api: "REST", breadth: "Core Endpoints", auth: "API Key", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Medium", blockers: ["High cost tier gating for API access"] },
      { name: "Moz", url: "https://moz.com", docs: "https://moz.com/help/links-api", api: "REST", breadth: "Full / Extensive", auth: "Basic Auth", access: "Self-Serve", mcp: "No MCP Support", build: "High", blockers: ["Access ID + Secret pairing", "Rate limit 10 req/sec"] }
    ]
  },
  {
    name: "Developer, Infra and Data Platforms",
    apps: [
      { name: "GitHub", url: "https://github.com", docs: "https://docs.github.com/en/rest", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Personal Access Token vs GitHub App permissions", "5,000 req/hr rate cap"] },
      { name: "GitLab", url: "https://about.gitlab.com", docs: "https://docs.gitlab.com/ee/api/rest/", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Private token header (PRIVATE-TOKEN)"] },
      { name: "Jira", url: "https://www.atlassian.com/software/jira", docs: "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Atlassian Document Format (ADF) rich text payload complexity"] },
      { name: "Linear", url: "https://linear.app", docs: "https://developers.linear.app/docs/graphql/working-with-the-graphql-api", api: "GraphQL", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["GraphQL only, clean schema and developer DX"] },
      { name: "Supabase", url: "https://supabase.com", docs: "https://supabase.com/docs/reference/api", api: "REST", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["PostgREST syntax for query filters", "Anon vs Service role keys"] },
      { name: "Vercel", url: "https://vercel.com", docs: "https://vercel.com/docs/rest-api", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Team ID query parameter required for team resources"] },
      { name: "Datadog", url: "https://www.datadoghq.com", docs: "https://docs.datadoghq.com/api/", api: "REST", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Requires both DD-API-KEY and DD-APPLICATION-KEY"] },
      { name: "Snowflake", url: "https://www.snowflake.com", docs: "https://docs.snowflake.com/en/developer-guide/sql-api/index", api: "REST", breadth: "Core Endpoints", auth: "OAuth2", access: "Self-Serve", mcp: "Community MCP Available", build: "Medium", blockers: ["Asynchronous query execution polling", "Warehouse compute spin-up latency"] },
      { name: "Postman", url: "https://www.postman.com", docs: "https://learning.postman.com/docs/developer/postman-api/intro-api/", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Monthly request caps on free tiers"] },
      { name: "Sentry", url: "https://sentry.io", docs: "https://docs.sentry.io/api/", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Auth token bearer header, granular project scopes"] }
    ]
  },
  {
    name: "Productivity and Project Management",
    apps: [
      { name: "Notion", url: "https://www.notion.so", docs: "https://developers.notion.com", api: "REST", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Explicit page sharing with bot integration required", "Block hierarchy depth limits"] },
      { name: "Airtable", url: "https://www.airtable.com", docs: "https://airtable.com/developers/web/api/introduction", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Rate limit 5 req/sec per base", "Personal Access Token scopes"] },
      { name: "Asana", url: "https://asana.com", docs: "https://developers.asana.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Opt-in headers for deprecations (Asana-Enable)", "Workspace GID requirement"] },
      { name: "Monday.com", url: "https://monday.com", docs: "https://developer.monday.com/api-reference/docs", api: "GraphQL", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Complexity budget system for GraphQL queries"] },
      { name: "ClickUp", url: "https://clickup.com", docs: "https://clickup.com/api", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Deep hierarchy traversal: Team -> Space -> Folder -> List -> Task"] },
      { name: "Trello", url: "https://trello.com", docs: "https://developer.atlassian.com/cloud/trello/rest/", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Key and Token passed in query string or headers"] },
      { name: "Coda", url: "https://coda.io", docs: "https://coda.io/developers/apis/v1", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Rate limit 200 req/min per user", "Doc formula recalculation delays"] },
      { name: "Google Workspace", url: "https://workspace.google.com", docs: "https://developers.google.com/workspace", api: "REST", breadth: "Full / Extensive", auth: "OAuth2", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Restricted scope OAuth verification warning screens", "Service account domain-wide delegation complexity"] },
      { name: "Miro", url: "https://miro.com", docs: "https://developers.miro.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Board coordinate positioning math for widget placement"] },
      { name: "Todoist", url: "https://todoist.com", docs: "https://developer.todoist.com/rest/v2/", api: "REST", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Clean lightweight REST API, instant self-serve token"] }
    ]
  },
  {
    name: "Finance and Fintech",
    apps: [
      { name: "Stripe", url: "https://stripe.com", docs: "https://docs.stripe.com/api", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Idempotency key enforcement", "Webhook signature verification"] },
      { name: "QuickBooks Online", url: "https://quickbooks.intuit.com", docs: "https://developer.intuit.com/app/developer/qbo/docs/develop", api: "REST + Webhooks", breadth: "Core Endpoints", auth: "OAuth2", access: "Self-Serve", mcp: "Community MCP Available", build: "Medium", blockers: ["OAuth token refresh required every 60 mins", "RealmID query parameter needed"] },
      { name: "Xero", url: "https://www.xero.com", docs: "https://developer.xero.com/documentation/api/accounting/overview", api: "REST + Webhooks", breadth: "Core Endpoints", auth: "OAuth2", access: "Self-Serve", mcp: "Community MCP Available", build: "Medium", blockers: ["Tenant ID header required", "Strict daily API request limits (5,000/day)"] },
      { name: "Plaid", url: "https://plaid.com", docs: "https://plaid.com/docs/api/", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Client ID + Secret pair", "Link token client-side handoff"] },
      { name: "Wise", url: "https://wise.com", docs: "https://docs.wise.com/api-reference", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "OpenAPI Spec Available", build: "High", blockers: ["Strong Customer Authentication (SCA) 2FA challenges on sensitive payments"] },
      { name: "Brex", url: "https://www.brex.com", docs: "https://developer.brex.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2 & API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Idempotency keys on transfer requests", "Granular user permissions"] },
      { name: "Ramp", url: "https://ramp.com", docs: "https://docs.ramp.com", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "OAuth2", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Client credentials flow required for machine-to-machine integrations"] },
      { name: "Bill.com", url: "https://www.bill.com", docs: "https://developer.bill.com", api: "REST", breadth: "Core Endpoints", auth: "Basic Auth", access: "Gated / Enterprise Approval", mcp: "No MCP Support", build: "Medium", blockers: ["Developer sandbox approval gating", "Session login API handshake"] },
      { name: "Mercury", url: "https://mercury.com", docs: "https://mercury.com/docs/api", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Read-only vs Read-Write IP access restrictions"] },
      { 
        name: "Paygent Connect", 
        url: "https://paygentlabs.com", 
        docs: "https://paygentlabs.com/docs", 
        api: "REST + Webhooks", 
        breadth: "Core Endpoints", 
        auth: "API Key", 
        access: "Waitlist / Contact Sales", 
        mcp: "Community MCP Available", 
        build: "Medium", 
        blockers: ["Invite-only developer access", "x402 protocol wallet signing required"],
        specialNotes: "Special Research Note: Paygent Connect provides usage-based billing, payment orchestration, and cost-control APIs specifically designed for AI agents and LLM applications (x402 protocol, micro-metering, autonomous wallet rails). Gated developer access."
      }
    ]
  },
  {
    name: "AI, Research and Media-native",
    apps: [
      { name: "OpenAI", url: "https://openai.com", docs: "https://platform.openai.com/docs", api: "REST", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Prepaid credit balance enforcement", "Tiered rate limits (RPM/TPM)"] },
      { name: "Anthropic", url: "https://www.anthropic.com", docs: "https://docs.anthropic.com", api: "REST", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Header anthropic-version required", "Credit balance checks"] },
      { name: "Hugging Face", url: "https://huggingface.co", docs: "https://huggingface.co/docs/api-inference", api: "REST", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Cold-start model loading latency on free inference API"] },
      { name: "Perplexity", url: "https://www.perplexity.ai", docs: "https://docs.perplexity.ai", api: "REST", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Strict usage rate limits per model"] },
      { name: "Midjourney", url: "https://www.midjourney.com", docs: "https://docs.midjourney.com", api: "None", breadth: "None", auth: "Pending", access: "No Public API", mcp: "No MCP Support", build: "Low", blockers: ["No public official API", "Requires unofficial Discord bot wrappers or web scraping"] },
      { name: "ElevenLabs", url: "https://elevenlabs.io", docs: "https://elevenlabs.io/docs/api-reference", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Character quota consumption per voice generation"] },
      { name: "Replicate", url: "https://replicate.com", docs: "https://replicate.com/docs/reference/http", api: "REST + Webhooks", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Asynchronous prediction polling or webhook callback"] },
      { name: "Pinecone", url: "https://www.pinecone.io", docs: "https://docs.pinecone.io", api: "gRPC", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Native MCP Server", build: "High", blockers: ["Index host URL differs per region/project"] },
      { name: "LangChain / LangSmith", url: "https://www.langchain.com", docs: "https://docs.smith.langchain.com", api: "REST", breadth: "Full / Extensive", auth: "API Key", access: "Self-Serve", mcp: "Community MCP Available", build: "High", blockers: ["Workspace project routing header required"] },
      { 
        name: "NotebookLM", 
        url: "https://notebooklm.google.com", 
        docs: "https://notebooklm.google.com", 
        api: "None", 
        breadth: "None", 
        auth: "Session / Cookie", 
        access: "No Public API", 
        mcp: "Community MCP Available", 
        build: "Low", 
        blockers: ["No official public consumer API", "Requires reverse-engineered session cookies or Vertex AI Enterprise tier"],
        specialNotes: "Special Research Note: Consumer Google NotebookLM currently lacks an official public developer API; programmatic agent interaction relies on reverse-engineered session cookies, the enterprise Vertex AI NotebookLM tier, or unofficial community MCP servers (notebooklm-mcp)."
      }
    ]
  }
];

let counter = 1;
const applications = [];

categories.forEach(cat => {
  cat.apps.forEach(app => {
    const appId = `APP-${String(counter).padStart(3, '0')}`;
    const authList = app.auth === 'OAuth2 & API Key' ? ['OAuth2', 'API Key'] : [app.auth];

    // As required by Task 2:
    // Pure baseline starting state: researchStatus is 'Pending' until research is executed.
    // Confidence is 0.0 until research is performed.
    // Verification is 'Pending Review' until human attestation.
    applications.push({
      id: appId,
      name: app.name,
      category: cat.name,
      url: app.url,
      docsUrl: app.docs,
      description: `${app.name} provides software tools in ${cat.name}. Evaluated for autonomous AI agent tool-calling, MCP support, and API buildability.`,
      
      // Research Status & Verification State
      researchStatus: "Pending",
      verificationStatus: "Pending Review",
      confidence: 0,
      
      // Technical Evaluation Schema
      apiAvailable: app.api !== 'None',
      apiType: app.api,
      apiBreadth: app.breadth,
      authMethod: app.auth,
      authMethods: authList,
      accessModel: app.access,
      apiAccess: app.access,
      mcpStatus: app.mcp,
      buildability: app.build,
      
      // Detailed Capabilities
      toolCallingSupport: app.build === 'High' ? 'Full Structured Tool Calling' : (app.build === 'Medium' ? 'Basic Actions' : 'Read-Only / None'),
      webhooksSupport: app.api.includes('Webhooks'),
      sdkAvailability: ["Python", "TypeScript"],
      rateLimits: app.build === 'High' ? "5,000 req/hr (Standard)" : "Tiered / Contact Sales",
      pricingTierForApi: app.access === 'Self-Serve' ? "Free Tier / Self-Serve" : "Paid / Enterprise Gated",
      sandboxAvailable: app.build === 'High',
      
      // Blockers & Evidence
      integrationBlockers: app.blockers,
      commonBlockers: app.blockers,
      evidenceUrls: [app.docs, app.url],
      
      // Summary & Special Notes
      agentSuitabilitySummary: `${app.name} ${app.build === 'High' ? 'is highly primed for autonomous AI agent integration' : (app.build === 'Medium' ? 'presents moderate integration hurdles requiring custom auth or pagination handling' : 'has severe blockers (gated access or lack of public API) restricting agent tool-calling')}.`,
      specialResearchNotes: app.specialNotes || undefined,
      lastResearched: undefined,
      verifiedBy: undefined
    });
    counter++;
  });
});

const outPath = path.join(process.cwd(), 'src', 'data', 'applications.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(applications, null, 2));

console.log(`Generated ${applications.length} applications in ${outPath}`);
