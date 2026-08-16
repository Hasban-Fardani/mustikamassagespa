import type { PortableTextBlock } from "emdash";

/**
 * The visual renderer intentionally keeps the landing page's art direction in
 * Astro components, while the copy and repeaters remain authored as EmDash
 * Portable Text blocks. These small helpers keep that boundary typed and
 * resilient when an editor leaves an optional field empty.
 */
export interface MustikaCmsNode extends PortableTextBlock {
	[key: string]: unknown;
}

export function isMustikaCmsNode(value: unknown): value is MustikaCmsNode {
	return Boolean(value && typeof value === "object" && "_type" in value);
}

export function getMustikaCmsNodes(value: unknown): MustikaCmsNode[] {
	return Array.isArray(value) ? value.filter(isMustikaCmsNode) : [];
}

export function findMustikaCmsNode(nodes: MustikaCmsNode[], ...types: string[]) {
	return nodes.find((node) => types.includes(node._type));
}

export function readMustikaString(value: unknown, fallback = "") {
	return typeof value === "string" ? value : fallback;
}

export function readMustikaStringList(value: unknown, fallback: string[]) {
	if (typeof value === "string") {
		return value
			.split("\n")
			.map((item) => item.trim())
			.filter(Boolean);
	}

	if (Array.isArray(value)) {
		return value
			.map((item) => {
				if (typeof item === "string") return item;
				if (item && typeof item === "object" && "text" in item) {
					return readMustikaString(item.text);
				}
				return "";
			})
			.filter(Boolean);
	}

	return fallback;
}

export function readMustikaRecords(value: unknown) {
	return Array.isArray(value) ? value.filter(isMustikaCmsNode) : [];
}
