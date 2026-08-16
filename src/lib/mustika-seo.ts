export const MUSTIKA_SITE_DESCRIPTION =
	"Pijat, refleksi, dan wellness di Bandung untuk pelanggan umum dan keluarga. Cek layanan dan jadwal lewat WhatsApp.";

export const MUSTIKA_SEO = {
	home: {
		title: "Mustika Massage Spa Bandung | Pijat & Wellness",
		description:
			"Pijat profesional, refleksi, dan wellness di Bandung untuk pelanggan umum dan keluarga. Kenali layanan Mustika dan booking melalui WhatsApp.",
	},
	pricing: {
		title: "Layanan Pijat & Wellness Bandung | Mustika",
		description:
			"Lihat pilihan pijat dan wellness Mustika di Bandung. Tanyakan layanan yang sesuai melalui WhatsApp.",
	},
	contact: {
		title: "Booking Pijat & Wellness Bandung | Mustika",
		description:
			"Booking pijat dan wellness Mustika di Bandung melalui WhatsApp. Sampaikan kebutuhan dan waktu yang Anda inginkan.",
	},
} as const;

export const MUSTIKA_PHONE = "+6281222739180";
export const MUSTIKA_WHATSAPP_URL =
	"https://wa.me/6281222739180?text=Halo%20Mustika%2C%20saya%20ingin%20booking%20sesi%20massage.";

export function toAbsoluteUrl(value: string, baseUrl: URL) {
	return new URL(value, baseUrl).href;
}
