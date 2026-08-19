import { MUSTIKA_COPY } from "./mustika-copy";

export const MUSTIKA_SITE_DESCRIPTION = MUSTIKA_COPY.seo.siteDescription;

export const MUSTIKA_SEO = {
	home: {
		title: MUSTIKA_COPY.seo.homeTitle,
		description: MUSTIKA_COPY.seo.homeDescription,
	},
	pricing: {
		title: MUSTIKA_COPY.seo.pricingTitle,
		description: MUSTIKA_COPY.seo.pricingDescription,
	},
	contact: {
		title: MUSTIKA_COPY.seo.contactTitle,
		description: MUSTIKA_COPY.seo.contactDescription,
	},
} as const;

export const MUSTIKA_PHONE = "+6281222739180";
export const MUSTIKA_WHATSAPP_URL =
	"https://wa.me/6281222739180?text=Halo%20Mustika%2C%20mau%20booking%20pijat.";

export function toAbsoluteUrl(value: string, baseUrl: URL) {
	return new URL(value, baseUrl).href;
}
