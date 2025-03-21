import { z } from 'zod';

export const SettingsSchema = z.object({
	editor: z.object({
		vimMode: z.boolean(),
	}),
	themeDark: z.boolean(),
});

export type Settings = z.infer<typeof SettingsSchema>;

export const RulesetSchema = z.object({
	id: z.string(),
	created: z.number(),
	updated: z.number(),
	name: z.string().min(1),
	active: z.boolean(),
	urls: z.string(),
	modules: z.array(z.string()),
});

export const NoIDRulesetSchema = RulesetSchema.omit({ id: true })

export type Ruleset = z.infer<typeof RulesetSchema>;
export type NoIdRuleset = z.infer<typeof NoIDRulesetSchema>;

export const ExtModuleSchema = z.object({
	id: z.string(),
	name: z.string().min(1),
	source: z.string().url(),
	autoUpdate: z.boolean(),
})
export const NoIDExtModuleSchema = ExtModuleSchema.omit({ id: true })
export const ExtModuleObjSchema = z.object({
	content: z.string(),
	identifier: z.object({
		contentLength: z.string().nullable(),
		etag: z.string().nullable(),
		hash: z.number().nullable(),
	})
})

export type NoIDExtModule = z.infer<typeof NoIDExtModuleSchema>;
export type ExtModule = z.infer<typeof ExtModuleSchema>;
export type ExtModuleObj = z.infer<typeof ExtModuleObjSchema>;

export const RulesetContentSchema = z.object({
	js: z.string(),
	css: z.string(),
})

export type RulesetContent = z.infer<typeof RulesetContentSchema>;

export const UrlMatchPatternSchema = z.union([
	// Special case: "<all_urls>"
	z.literal("<all_urls>"),

	// General case: <scheme>://<host>/<path>
	z.string().regex(
		/^(?:(\*|http|https|file):\/\/)(\*|(?:\*\.)?[a-zA-Z0-9.-]+)(\/.*)$/,
		{
			message: "Invalid match pattern. Ensure it follows the <scheme>://<host>/<path> format.",
		}
	),
]);
export type UrlMatchPattern = z.infer<typeof UrlMatchPatternSchema>;
