import { nullable, z } from 'zod';

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
	name: z.string(),
	active: z.boolean(),
	urls: z.string(),
	modules: z.array(z.string()),
});

export const NoIDRulesetSchema = RulesetSchema.omit({ id: true })

export type Ruleset = z.infer<typeof RulesetSchema>;
export type NoIdRuleset = z.infer<typeof NoIDRulesetSchema>;

export const ExtModuleSchema = z.object({
	id: z.string(),
	name: z.string(),
	source: z.string().url(),
	autoUpdate: z.boolean(),
})
export const NoIDExtModuleSchema = ExtModuleSchema.omit({ id: true })
export const ExtModuleObjSchema = z.object({
	content: z.string(),
	identifier: z.object({
		contentLength: z.string().nullable(),
		etag: z.string().nullable(),
		hash: z.number(),
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
