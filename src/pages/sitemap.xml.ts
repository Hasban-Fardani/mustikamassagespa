import type { APIRoute } from "astro";

const publicPaths = ["/", "/pricing", "/contact"];

export const GET: APIRoute = ({ url }) => {
	const origin = url.origin;
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPaths.map((path) => `	<url><loc>${new URL(path, origin).href}</loc></url>`).join("\n")}
</urlset>`;

	return new Response(body, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=86400",
		},
	});
};
