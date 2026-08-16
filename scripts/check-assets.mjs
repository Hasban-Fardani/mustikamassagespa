const baseUrl = process.env.MUSTIKA_BASE_URL || "http://localhost:4321";

const pageResponse = await fetch(`${baseUrl}/`);
const html = await pageResponse.text();
const assetPaths = [
	...new Set(
		[...html.matchAll(/(?:src|href)="([^"]+)"/g)]
			.map(([, url]) => url)
			.filter((url) => url.startsWith("/_astro/") || url.startsWith("/images/")),
	),
];

const results = await Promise.all(
	assetPaths.map(async (path) => {
		const response = await fetch(`${baseUrl}${path}`);
		return { path, status: response.status };
	}),
);

const failures = results.filter(({ status }) => status !== 200);

if (pageResponse.status !== 200 || failures.length > 0 || assetPaths.length === 0) {
	console.error(
		JSON.stringify(
			{
				page: pageResponse.status,
				assets: results,
			},
			null,
			2,
		),
	);
	process.exit(1);
}

console.log(`Asset check passed: ${assetPaths.length} referenced assets returned 200.`);
