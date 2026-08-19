// Worker entry: Astro fetch plus EmDash scheduled() for the Cron Trigger
// in wrangler.jsonc. Do not re-export PluginBridge — that Worker Loader
// binding is a paid Dynamic Workers feature and fails on the free plan.
// @ts-expect-error resolved against this app's Astro build
import astroHandler from "@astrojs/cloudflare/entrypoints/server";
import { createApp } from "astro/app/entrypoint";
import { runScheduledTasks } from "emdash/middleware";

let app: ReturnType<typeof createApp> | null = null;

async function invalidatePublishedTags(
	published: ReadonlyArray<{ collection: string; id: string }>,
): Promise<void> {
	if (published.length === 0) return;
	app ??= createApp();
	const provider = await app.pipeline.getCacheProvider();
	if (!provider) return;
	const tags = [...new Set(published.flatMap((ref) => [ref.collection, ref.id]))];
	await provider.invalidate({ tags });
}

const handler = astroHandler as ExportedHandler;

export default {
	...handler,
	scheduled(_controller, _env, ctx) {
		ctx.waitUntil(
			runScheduledTasks({ onPublished: invalidatePublishedTags })
				.then(({ published }) => {
					if (published.length > 0) {
						console.log(`[scheduled] Published ${published.length} scheduled item(s)`);
					}
					return undefined;
				})
				.catch((error: unknown) => {
					console.error("[scheduled] runScheduledTasks failed:", error);
				}),
		);
	},
} satisfies ExportedHandler;
