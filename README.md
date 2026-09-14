# WXT + Svelte

This template should help get you started developing with Svelte in WXT.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Roadmap

### Fix the ruleset save/toggle flow (currently broken)

- [ ] `RulesetStorage` has no `update`/`delete` methods, but the UI already calls
      `RulesetStorage.update()` (`ruleset-edit.svelte`, `ruleset-columns.ts`) and
      `RulesetStorage.delete()` (`ruleset-columns.ts`) — saving an edit, toggling a
      ruleset, and deleting one all throw at runtime today
- [ ] `RulesetStorage.create()` builds the new ruleset but never calls
      `setValue()`, so newly created rulesets are never persisted
      (`src/lib/storage.ts:31-42`)
- [ ] Re-enabling a ruleset from the table toggle doesn't register its userScript
      again — only the disable path unregisters (`ruleset-columns.ts:38`)
- [ ] `registerOrUpdateUserScript()` is called with a hardcoded
      `matches: ['https://example.com/*']` instead of the URLs the user actually
      configured — `validateUrlPattern()` computes real `matches`/`excludeMatches`
      but the result is discarded (`ruleset-edit.svelte:54-60`)

### Wire up CSS injection

- [ ] CSS is captured and saved (`rulesetContent.css`) but never injected anywhere
      — there's no style-injection call alongside the JS `userScripts.register`
      call, even though CSS injection is core to this extension's purpose

### External modules

- [ ] Implement auto update of external modules — `ExtModuleStorage.updateContent()`
      already exists but nothing calls it automatically; needs a scheduled trigger
      (e.g. `browser.alarms`) for modules with `autoUpdate: true`

### Startup reliability

- [ ] Reconcile stored rulesets with registered userScripts on extension
      startup/install — `background.ts` is still a placeholder, so if
      registration is lost (browser restart, extension update) active rulesets
      stay inert until manually re-saved

### Cleanup

- [ ] Remove or repurpose the leftover `content.ts` placeholder (scoped to
      `*://*.google.com/*`, just logs to console) — actual injection goes through
      `userScripts.register`, not a content script
- [ ] Firefox: `browser.userScripts.getScripts()` doesn't work — add a
      Firefox-compatible fallback for the scripts list UI (`Options.svelte`,
      `scripts.svelte`, `Debug.svelte`)
- [ ] Remove the dead `$pages` alias in `wxt.config.ts` (the directory no longer
      exists after the options page refactor)
- [ ] Remove the unused `onSave()` stub in `ruleset-edit.svelte`
