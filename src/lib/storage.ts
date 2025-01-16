import { Ruleset } from "$lib/schema";

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

	static async add(ruleset: Ruleset) {
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
