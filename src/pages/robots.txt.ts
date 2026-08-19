import type { APIRoute } from "astro";

export const GET: APIRoute = ({ url }) => {
	const origin = url.origin;
	const body = `User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", origin).href}
`;

	return new Response(body, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=86400",
		},
	});
};
