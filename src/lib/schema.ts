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
	name: z.string(),
	active: z.boolean(),
	urls: z.string(),
	modules: z.array(z.number()),
});

export type Ruleset = z.infer<typeof RulesetSchema>;

export const ExtModuleSchema = z.object({
	id: z.string(),
	name: z.string(),
	source: z.string().url(),
	hash: z.string(),
	content: z.string(),
	autoUpdate: z.boolean()
})

export type ExtModule = z.infer<typeof ExtModuleSchema>;
