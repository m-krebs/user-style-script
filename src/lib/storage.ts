import { ExtModule, ExtModuleObj, NoIDExtModule, NoIdRuleset, Ruleset, RulesetContent } from "$lib/schema";
import { hashCode } from "$lib/utils";
import { storage } from "wxt/storage"

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
		let rules: Ruleset[] = await RulesetStorage.item.getValue() as Ruleset[];

		const index = rules.findIndex(rule => rule.id == ruleset.id)
		if (index == -1) {
			rules.push(ruleset)
		} else {
			rules[index] = ruleset
		}

		RulesetStorage.item.setValue(rules).then(result => Promise.resolve(true))
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
			id: "394u39f93999349i39",
			source: "https://example.com",
			name: "jnotquery",
			autoUpdate: true
		}]
	});

	static watch(callback: (changedValue: ExtModule[]) => void) { return ExtModuleStorage.item.watch(callback) }

	static async add(module: NoIDExtModule) {
		let modules: ExtModule[] = await ExtModuleStorage.item.getValue() as ExtModule[];

		let uuid = crypto.randomUUID();
		while (modules.find((module) => module.id === uuid)) {
			uuid = crypto.randomUUID()
		}

		modules.push({ ...module, id: uuid });

		ExtModuleStorage.item.setValue(modules);

		const response = await fetch(module.source)

		const eTag = response.headers.get('ETag');
		const contentLength = response.headers.get('Content-Length')
		const content = await response.text();
		const hash = hashCode(content);

		storage.defineItem<ExtModuleObj>(`local:${uuid}`).setValue({
			content: content,
			identifier: {
				contentLength: contentLength || null,
				etag: eTag || null,
				hash: hash,
			}
		});
	}

	static async update(module: ExtModule) {
		let modules: ExtModule[] = await ExtModuleStorage.item.getValue() as ExtModule[];

		const index = modules.findIndex(m => m.id == module.id)
		if (index == -1) {
			modules.push(module)
		} else {
			modules[index] = module
		}

		ExtModuleStorage.item.setValue(modules)
	}

	static async updateContent(id: string) {
		let modules: ExtModule[] = await ExtModuleStorage.item.getValue() as ExtModule[];

		let module = modules.find(m => m.id === id)
		if (!module) throw new Error("External Module does not exist!");

		let moduleObject: ExtModuleObj | null = await storage.getItem(`local:${id}`)
		if (moduleObject === null) throw new Error("Could not find external module!");

		const responseHead = await fetch(module.source, { method: 'HEAD' });
		const eTag = responseHead.headers.get('ETag');
		const contentLength = responseHead.headers.get('Content-Length');

		console.log(moduleObject)
		if (eTag === moduleObject.identifier.etag
			|| contentLength === moduleObject.identifier.contentLength)
			return { success: false, message: "Content already up-to-date" };

		const response = await fetch(module.source);
		const content = await response.text();
		const hash = hashCode(content);

		if (hashCode(content) === moduleObject.identifier.hash)
			return Promise.resolve({ success: false, message: "Content already up-to-date" })

		moduleObject.content = content;
		moduleObject.identifier = {
			contentLength: contentLength,
			etag: eTag,
			hash: hash,
		}

		await storage.setItem(`local:${id}`, moduleObject)
			.then(result => Promise
				.resolve({ successs: true, message: "Content updated" }))
			.catch(error => Promise
				.reject(new Error("Failed updating module content: " + error.message)))
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
