import { MUSTIKA_COPY } from "./mustika-copy";

export const MUSTIKA_SITE_DESCRIPTION = MUSTIKA_COPY.seo.siteDescription;

export const MUSTIKA_OG_IMAGE = "/images/mustika/og-share.jpg";
export const MUSTIKA_OG_IMAGE_WIDTH = 1200;
export const MUSTIKA_OG_IMAGE_HEIGHT = 630;
export const MUSTIKA_OG_IMAGE_TYPE = "image/jpeg";
export const MUSTIKA_OG_IMAGE_ALT = MUSTIKA_COPY.seo.ogImageAlt;

export const MUSTIKA_SEO = {
	home: {
		title: MUSTIKA_COPY.seo.homeTitle,
		description: MUSTIKA_COPY.seo.homeDescription,
		shareTitle: MUSTIKA_COPY.seo.homeShareTitle,
		shareDescription: MUSTIKA_COPY.seo.homeShareDescription,
	},
	pricing: {
		title: MUSTIKA_COPY.seo.pricingTitle,
		description: MUSTIKA_COPY.seo.pricingDescription,
		shareTitle: MUSTIKA_COPY.seo.pricingShareTitle,
		shareDescription: MUSTIKA_COPY.seo.pricingShareDescription,
	},
	contact: {
		title: MUSTIKA_COPY.seo.contactTitle,
		description: MUSTIKA_COPY.seo.contactDescription,
		shareTitle: MUSTIKA_COPY.seo.contactShareTitle,
		shareDescription: MUSTIKA_COPY.seo.contactShareDescription,
	},
} as const;

export type MustikaSeoPage = keyof typeof MUSTIKA_SEO;

export function mustikaPageSeo(page: MustikaSeoPage) {
	const spec = MUSTIKA_SEO[page];
	return {
		title: spec.title,
		description: spec.description,
		ogTitle: spec.shareTitle,
		ogDescription: spec.shareDescription,
		ogImage: MUSTIKA_OG_IMAGE,
		ogImageAlt: MUSTIKA_OG_IMAGE_ALT,
	};
}

export const MUSTIKA_PHONE = "+6281222739180";
export const MUSTIKA_WHATSAPP_URL =
	"https://wa.me/6281222739180?text=Halo%20Mustika%2C%20mau%20booking%20pijat.";

export function toAbsoluteUrl(value: string, baseUrl: URL) {
	return new URL(value, baseUrl).href;
}
