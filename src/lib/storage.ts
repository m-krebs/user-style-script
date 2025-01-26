import { ExtModule, NoIDExtModule, NoIdRuleset, Ruleset, RulesetContent } from "$lib/schema";

export const RulesetStorage = class {
	static item = storage.defineItem<Ruleset[]>('local:rulesets', {
		defaultValue: [{
			id: "30953483948932",
			active: false,
			created: Date.now(),
			updated: Date.now(),
			modules: [],
			name: "Default Example",
			urls: ""
		}]
	})

	static watch(callback: (changedValue: Ruleset[]) => void) { return RulesetStorage.item.watch(callback) }

	static async create(ruleset: NoIdRuleset) {
		let rules: Ruleset[] = await RulesetStorage.item.getValue() as Ruleset[];

		let uuid = crypto.randomUUID();
		while (rules.find((ruleset) => ruleset.id === uuid)) {
			uuid = crypto.randomUUID()
		}

		const newRuleset: Ruleset = { id: uuid, ...ruleset }

		rules.push(newRuleset)
	}

	static async update(ruleset: Ruleset) {
		console.log("ToUpdate: ", ruleset)
		let rules: Ruleset[] = await RulesetStorage.item.getValue() as Ruleset[];

		const index = rules.findIndex(rule => rule.id == ruleset.id)
		if (index == -1) {
			rules.push(ruleset)
		} else {
			rules[index] = ruleset
		}

		RulesetStorage.item.setValue(rules)
	}

	static async get(id: string) {
		return await RulesetStorage.item.getValue().then(ruleset => ruleset.find(r => r.id === id))
	}

	static async getAll() {
		return await RulesetStorage.item.getValue()
	}

	static async delete(id: string) {
		let rules: Ruleset[] = await RulesetStorage.item.getValue() as Ruleset[];

		RulesetStorage.item.setValue(rules.filter(rule => rule.id !== id))
	}
}

export const ExtModuleStorage = class {
	static item = storage.defineItem<ExtModule[]>('local:modules', {
		defaultValue: [{
			id: "30953483948932",
			source: "https://example.com",
			hash: "asdjfkasjdfljdsk",
			name: "jnotquery",
			autoUpdate: true
		}]
	})

	static watch(callback: (changedValue: ExtModule[]) => void) { return ExtModuleStorage.item.watch(callback) }

	static async add(module: NoIDExtModule) {
		let modules: ExtModule[] = await ExtModuleStorage.item.getValue() as ExtModule[];

		let uuid = crypto.randomUUID();
		while (modules.find((module) => module.id === uuid)) {
			uuid = crypto.randomUUID()
		}

		modules.push({ ...module, id: uuid })

		ExtModuleStorage.item.setValue(modules)
	}

	static async update(module: ExtModule) {
		let modules: ExtModule[] = await ExtModuleStorage.item.getValue() as ExtModule[];

		const index = modules.findIndex(rule => rule.id == module.id)
		if (index == -1) {
			modules.push(module)
		} else {
			modules[index] = module
		}

		ExtModuleStorage.item.setValue(modules)
	}

	static async get(id: string) {
		return await ExtModuleStorage.item.getValue().then(ruleset => ruleset.find(r => r.id === id))
	}

	static async getAll() {
		return await ExtModuleStorage.item.getValue()
	}

	static async delete(id: string) {
		let modules: ExtModule[] = await ExtModuleStorage.item.getValue() as ExtModule[];

		ExtModuleStorage.item.setValue(modules.filter(rule => rule.id !== id))
	}
}
