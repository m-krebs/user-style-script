import type {
  ExtModule,
  ExtModuleObj,
  NoIDExtModule,
  NoIdRuleset,
  Ruleset,
} from '$lib/schema'
import { hashCode } from '$lib/utils'
import { storage } from 'wxt/utils/storage'

export const RulesetStorage = {
  item: storage.defineItem<Ruleset[]>('local:rulesets', {
    defaultValue: [],
  }),

  async getRules(): Promise<Ruleset[]> {
    return await this.item.getValue()
  },

  async watch(callback: (changedValue: Ruleset[]) => void) {
    return this.item.watch(callback)
  },

  async modify(mutator: (rules: Ruleset[]) => Ruleset[]) {
    const rules = await this.getRules()
    const updated = mutator(rules)
    await this.item.setValue(updated)
    return updated
  },

  async create(ruleset: NoIdRuleset) {
    const rules: Ruleset[] = (await this.getRules()) as Ruleset[]

    let uuid = crypto.randomUUID()
    while (rules.find((ruleset) => ruleset.id === uuid)) {
      uuid = crypto.randomUUID()
    }

    const newRuleset: Ruleset = { id: uuid, ...ruleset }

    rules.push(newRuleset)
  },

  // async update(ruleset: Ruleset) {
  //   let rules: Ruleset[] = (await RulesetStorage.item.getValue()) as Ruleset[]
  //
  //   const index = rules.findIndex((rule) => rule.id === ruleset.id)
  //   if (index === -1) {
  //     rules.push(ruleset)
  //   } else {
  //     rules[index] = ruleset
  //   }
  //
  //   await RulesetStorage.item.setValue(rules)
  // }

  async get(id: string) {
    return await this.getRules().then((rulesets: Ruleset[]) =>
      rulesets.find((r) => r.id === id),
    )
  },

  async getAll() {
    return await this.getRules()
  },

  async deleteRuleset(id: string) {
    return this.modify((rules: Ruleset[]) => rules.filter((r) => r.id !== id))
  },
}

export const ExtModuleStorage = {
  item: storage.defineItem<ExtModule[]>('local:modules', {
    defaultValue: [],
  }),

  async getModules() {
    return this.item.getValue()
  },

  watch(callback: (changedValue: ExtModule[]) => void) {
    return ExtModuleStorage.item.watch(callback)
  },

  async add(module: NoIDExtModule) {
    const modules: ExtModule[] =
      (await ExtModuleStorage.item.getValue()) as ExtModule[]

    let uuid = crypto.randomUUID()
    while (modules.find((module) => module.id === uuid)) {
      uuid = crypto.randomUUID()
    }

    modules.push({ ...module, id: uuid })

    ExtModuleStorage.item.setValue(modules)

    let response = null
    try {
      response = await fetch(module.source)
      if (!response.ok) throw new Error(response.statusText)
    } catch (error) {
      storage.defineItem<ExtModuleObj>(`local:${uuid}`).setValue({
        content: '',
        identifier: {
          contentLength: null,
          etag: null,
          hash: null,
        },
      })
      if (error instanceof Error) throw new Error(error.message)
    }

    const eTag = response!.headers.get('ETag')
    const contentLength = response!.headers.get('Content-Length')
    const content = await response!.text()
    const hash = hashCode(content)

    storage.defineItem<ExtModuleObj>(`local:${uuid}`).setValue({
      content: content,
      identifier: {
        contentLength: contentLength || null,
        etag: eTag || null,
        hash: hash || null,
      },
    })
  },

  async update(module: ExtModule) {
    const modules: ExtModule[] =
      (await ExtModuleStorage.item.getValue()) as ExtModule[]

    const index = modules.findIndex((m) => m.id === module.id)
    if (index === -1) {
      modules.push(module)
    } else {
      modules[index] = module
    }

    try {
      await ExtModuleStorage.item.setValue(modules)
      return { success: true, message: 'Saved module.' }
    } catch (error) {
      throw Error(`Failed to update external module: ${error}`)
    }
  },

  async updateContent(id: string) {
    const modules: ExtModule[] =
      (await ExtModuleStorage.item.getValue()) as ExtModule[]

    const module = modules.find((m) => m.id === id)
    if (!module) throw new Error('External module does not exist.')

    const moduleObject: ExtModuleObj | null = await storage.getItem(
      `local:${id}`,
    )
    // TODO: throw different error when fetching fails
    if (moduleObject === null)
      throw new Error('Could not find external module.')

    const responseHead = await fetch(module.source, { method: 'HEAD' })
    const eTag = responseHead.headers.get('ETag')
    const contentLength = responseHead.headers.get('Content-Length')

    console.log(moduleObject)
    if (
      eTag === moduleObject.identifier.etag ||
      contentLength === moduleObject.identifier.contentLength
    )
      return { success: false, message: 'Content up-to-date' }

    const response = await fetch(module.source)
    const content = await response.text()
    const hash = hashCode(content)

    if (hashCode(content) === moduleObject.identifier.hash)
      return { success: false, message: 'Content up-to-date' }

    moduleObject.content = content
    moduleObject.identifier = {
      contentLength: contentLength,
      etag: eTag,
      hash: hash,
    }

    try {
      await storage.setItem(`local:${id}`, moduleObject)
      return { success: true, message: 'Content updated' }
    } catch (error) {
      throw Error(`Failed to update module content: ${error}`)
    }
  },

  async get(id: string) {
    const ruleset = await ExtModuleStorage.item.getValue()
    return ruleset.find((r) => r.id === id)
  },

  async getAll() {
    return await ExtModuleStorage.item.getValue()
  },

  async delete(id: string) {
    const modules: ExtModule[] =
      (await ExtModuleStorage.item.getValue()) as ExtModule[]

    try {
      await ExtModuleStorage.item.setValue(
        modules.filter((rule) => rule.id !== id),
      )
      return { success: true, message: 'Successfully deleted module.' }
    } catch (error) {
      throw Error(`Failed to delete module: ${error}`)
    }
  },
}
