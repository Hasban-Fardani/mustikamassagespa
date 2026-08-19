export type MustikaRate = {
	minutes: number;
	amountIdr: number;
};

export type MustikaTariff = {
	consultOnly: boolean;
	consultHref: string;
	rates: Array<{
		minutes: number;
		amountIdr: number;
		priceLabel: string;
		href: string;
	}>;
};

const FALLBACK_BOOKING_ORIGIN = "https://wa.me/6281222739180";

const TARIFFS_BY_KEY: Record<string, MustikaRate[] | "consult"> = {
	traditional: [
		{ minutes: 60, amountIdr: 245_000 },
		{ minutes: 90, amountIdr: 290_000 },
		{ minutes: 120, amountIdr: 425_000 },
	],
	aromatherapy: [
		{ minutes: 60, amountIdr: 290_000 },
		{ minutes: 90, amountIdr: 325_000 },
		{ minutes: 120, amountIdr: 475_000 },
	],
	fullbody: [{ minutes: 120, amountIdr: 425_000 }],
	wellness: "consult",
};

export function formatMustikaPrice(amountIdr: number) {
	return `Rp ${new Intl.NumberFormat("id-ID").format(amountIdr)}`;
}

export function mustikaWhatsAppHref(message: string, bookingHref: string) {
	try {
		const url = new URL(bookingHref);
		url.searchParams.set("text", message);
		return url.toString();
	} catch {
		return `${FALLBACK_BOOKING_ORIGIN}?text=${encodeURIComponent(message)}`;
	}
}

function tariffKeyForTitle(title: string) {
	const normalized = title.toLowerCase();
	if (normalized.includes("wellness")) return "wellness";
	if (normalized.includes("aroma")) return "aromatherapy";
	if (normalized.includes("full") || normalized.includes("seluruh")) return "fullbody";
	if (normalized.includes("traditional") || normalized.includes("tradisional")) return "traditional";
	return "wellness";
}

export function getMustikaTariff(title: string, bookingHref: string): MustikaTariff {
	const key = tariffKeyForTitle(title);
	const consultHref = mustikaWhatsAppHref(
		`Halo Mustika, mau tanya ${title}.`,
		bookingHref,
	);
	const spec = TARIFFS_BY_KEY[key] ?? "consult";

	if (spec === "consult") {
		return { consultOnly: true, consultHref, rates: [] };
	}

	return {
		consultOnly: false,
		consultHref,
		rates: spec.map((rate) => ({
			...rate,
			priceLabel: formatMustikaPrice(rate.amountIdr),
			href: mustikaWhatsAppHref(
				`Halo Mustika, mau booking ${title} ${rate.minutes} menit.`,
				bookingHref,
			),
		})),
	};
}
