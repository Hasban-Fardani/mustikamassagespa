/**
 * EmDash Portable Text blocks for the Mustika marketing pages.
 *
 * The block definitions make the copy and repeatable content editable from
 * the EmDash admin while the public renderer keeps Mustika's bespoke visual
 * system. Block Kit fields are intentionally scalar/repeater-friendly so the
 * seed remains portable across EmDash deployments.
 */

import { definePlugin } from "emdash";
import type { PluginDefinition } from "emdash";

const ICON_OPTIONS = [
	{ label: "Lightning", value: "zap" },
	{ label: "Shield", value: "shield" },
	{ label: "Users", value: "users" },
	{ label: "Chart", value: "chart" },
	{ label: "Code", value: "code" },
	{ label: "Globe", value: "globe" },
	{ label: "Heart", value: "heart" },
	{ label: "Star", value: "star" },
	{ label: "Check", value: "check" },
	{ label: "Lock", value: "lock" },
	{ label: "Clock", value: "clock" },
	{ label: "Cloud", value: "cloud" },
];

const definition: PluginDefinition = {
	id: "marketing-blocks",
	version: "0.2.0",

	admin: {
		portableTextBlocks: [
			{
				type: "marketing.hero",
				label: "Hero",
				category: "Mustika Landing",
				description: "Big headline section with optional CTAs",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{ type: "text_input", action_id: "emphasis", label: "Headline emphasis" },
					{ type: "text_input", action_id: "subheadline", label: "Subheadline", multiline: true },
					{ type: "text_input", action_id: "primaryCtaLabel", label: "Primary CTA label" },
					{ type: "text_input", action_id: "primaryCtaUrl", label: "Primary CTA URL" },
					{ type: "text_input", action_id: "secondaryCtaLabel", label: "Secondary CTA label" },
					{ type: "text_input", action_id: "secondaryCtaUrl", label: "Secondary CTA URL" },
					{ type: "text_input", action_id: "location", label: "Location" },
					{ type: "text_input", action_id: "audienceLabel", label: "Audience label" },
					{ type: "toggle", action_id: "centered", label: "Center the layout" },
				],
			},

			{
				type: "mustika.intro",
				label: "Mustika Intro",
				category: "Mustika Landing",
				description: "Editorial introduction and audience cues",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{ type: "text_input", action_id: "emphasis", label: "Headline emphasis" },
					{ type: "text_input", action_id: "body", label: "Body", multiline: true },
					{ type: "text_input", action_id: "audience", label: "Audience (one per line)", multiline: true },
					{ type: "text_input", action_id: "linkLabel", label: "Link label" },
					{ type: "text_input", action_id: "linkUrl", label: "Link URL" },
				],
			},

			{
				type: "marketing.features",
				label: "Services",
				category: "Mustika Landing",
				description: "Repeatable massage and wellness services",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{ type: "text_input", action_id: "emphasis", label: "Headline emphasis" },
					{ type: "text_input", action_id: "subheadline", label: "Subheadline", multiline: true },
					{
						type: "repeater",
						action_id: "features",
						label: "Services",
						item_label: "Service",
						min_items: 1,
						max_items: 12,
						fields: [
							{ type: "select", action_id: "icon", label: "Icon", options: ICON_OPTIONS },
							{ type: "text_input", action_id: "title", label: "Title" },
							{ type: "text_input", action_id: "tag", label: "Audience tag" },
							{ type: "text_input", action_id: "description", label: "Description", multiline: true },
						],
					},
				],
			},

			{
				type: "marketing.pricing",
				label: "Pricing / Sesi",
				category: "Sections",
				description: "Pilihan sesi atau paket yang bisa ditanyakan ke admin",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{ type: "text_input", action_id: "subheadline", label: "Subheadline", multiline: true },
					{
						type: "repeater",
						action_id: "plans",
						label: "Plans",
						item_label: "Plan",
						min_items: 1,
						max_items: 6,
						fields: [
							{ type: "text_input", action_id: "name", label: "Name" },
							{ type: "text_input", action_id: "price", label: "Price" },
							{ type: "text_input", action_id: "period", label: "Period" },
							{ type: "text_input", action_id: "description", label: "Description", multiline: true },
							{ type: "text_input", action_id: "features", label: "Features (one per line)", multiline: true },
							{ type: "text_input", action_id: "ctaLabel", label: "CTA label" },
							{ type: "text_input", action_id: "ctaUrl", label: "CTA URL" },
							{ type: "toggle", action_id: "highlighted", label: "Highlight" },
						],
					},
				],
			},

			{
				type: "mustika.experience",
				label: "Mustika Experience",
				category: "Mustika Landing",
				description: "The three-step massage experience",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{ type: "text_input", action_id: "emphasis", label: "Headline emphasis" },
					{ type: "text_input", action_id: "body", label: "Body", multiline: true },
					{
						type: "repeater",
						action_id: "steps",
						label: "Steps",
						item_label: "Step",
						min_items: 1,
						max_items: 6,
						fields: [
							{ type: "text_input", action_id: "number", label: "Number" },
							{ type: "text_input", action_id: "title", label: "Title" },
							{ type: "text_input", action_id: "text", label: "Description", multiline: true },
						],
					},
				],
			},

			{
				type: "mustika.standards",
				label: "Mustika Standards",
				category: "Mustika Landing",
				description: "The details that shape the experience",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{ type: "text_input", action_id: "emphasis", label: "Headline emphasis" },
					{ type: "text_input", action_id: "body", label: "Body", multiline: true },
					{ type: "text_input", action_id: "quote", label: "Quote", multiline: true },
					{
						type: "repeater",
						action_id: "items",
						label: "Standards",
						item_label: "Standard",
						min_items: 1,
						max_items: 8,
						fields: [{ type: "text_input", action_id: "text", label: "Text" }],
					},
				],
			},

			{
				type: "marketing.faq",
				label: "FAQ",
				category: "Mustika Landing",
				description: "Frequently asked questions",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "repeater",
						action_id: "items",
						label: "Questions",
						item_label: "Question",
						min_items: 1,
						max_items: 12,
						fields: [
							{ type: "text_input", action_id: "question", label: "Question" },
							{ type: "text_input", action_id: "answer", label: "Answer", multiline: true },
						],
					},
				],
			},

			{
				type: "mustika.booking",
				label: "Mustika Booking CTA",
				category: "Mustika Landing",
				description: "Final WhatsApp booking call to action",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{ type: "text_input", action_id: "emphasis", label: "Headline emphasis" },
					{ type: "text_input", action_id: "body", label: "Body", multiline: true },
					{ type: "text_input", action_id: "ctaLabel", label: "CTA label" },
					{ type: "text_input", action_id: "ctaUrl", label: "CTA URL" },
					{ type: "text_input", action_id: "phone", label: "WhatsApp display number" },
				],
			},

			// Retained for the generic marketing renderer used by other templates.
			{
				type: "marketing.testimonials",
				label: "Testimonials",
				category: "Sections",
				description: "Customer testimonial cards",
				fields: [
					{ type: "text_input", action_id: "headline", label: "Headline" },
					{
						type: "repeater",
						action_id: "testimonials",
						label: "Testimonials",
						item_label: "Testimonial",
						min_items: 1,
						fields: [
							{ type: "text_input", action_id: "quote", label: "Quote", multiline: true },
							{ type: "text_input", action_id: "author", label: "Author name" },
							{ type: "text_input", action_id: "role", label: "Role / title" },
							{ type: "text_input", action_id: "company", label: "Company" },
							{ type: "text_input", action_id: "avatar", label: "Avatar URL" },
						],
					},
				],
			},
		],
	},
};

export function createPlugin() {
	return definePlugin(definition);
}

export default createPlugin;
