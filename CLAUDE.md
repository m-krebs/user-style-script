# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A browser extension (Chrome/Chromium and Firefox) that allows users to inject custom JavaScript and CSS into websites via configurable rulesets. Built with WXT framework, Svelte 5, and TailwindCSS.

## Build Commands

```bash
# Development
pnpm dev                  # Chrome/Chromium (MV3)
pnpm dev:firefox          # Firefox (MV2)

# Production builds
pnpm build                # Chrome/Chromium
pnpm build:firefox        # Firefox

# Package for distribution
pnpm zip                  # Chrome/Chromium
pnpm zip:firefox          # Firefox

# Linting and type checking
pnpm lint                 # Biome linter
pnpm check                # Svelte type checking
```

## Architecture

### Browser Extension Structure (WXT Framework)

The extension follows WXT's entrypoint-based architecture:

- **Background script** (`src/entrypoints/background.ts`): Minimal setup, handles extension lifecycle
- **Content script** (`src/entrypoints/content.ts`): Currently placeholder, will inject user scripts
- **Options page** (`src/entrypoints/options/`): Full-featured SPA for managing rulesets and modules
- **Popup** (`src/entrypoints/popup/`): Browser action popup interface

### Data Model

The extension manages two primary entities stored in browser local storage:

**Rulesets** (`src/lib/storage.ts:RulesetStorage`):
- User-defined rules that specify when/where to inject code
- Contains: URL match patterns, references to modules, enabled state
- Schema: `src/lib/schema.ts:RulesetSchema`
- Each ruleset has unique UUID, creation/update timestamps

**External Modules** (`src/lib/storage.ts:ExtModuleStorage`):
- Reusable JS/CSS code fetched from external URLs
- Supports auto-update with ETag/content-length tracking
- Content cached locally with hash-based change detection
- Schema: `src/lib/schema.ts:ExtModuleSchema`
- Module content stored separately as `ExtModuleObj` with identifier metadata

### Storage Architecture

Storage uses WXT's storage utilities (`wxt/utils/storage`):
- All data persists in browser's `local` storage area
- Rulesets array: `local:rulesets`
- Modules array: `local:modules`
- Individual module content: `local:{moduleId}`
- Storage operations are async and include reactive `watch()` for real-time UI updates

### Options Page (SPA)

Built with Svelte 5 and svelte-spa-router:

**Routing** (`src/entrypoints/options/app.svelte`):
```
/                      → Rulesets list (Options.svelte)
/ruleset/add           → Create new ruleset (ruleset/add.svelte)
/ruleset/*             → Edit existing ruleset (ruleset/edit.svelte)
/modules               → External modules manager (modules/modules.svelte)
/settings              → General settings (settings/Settings.svelte)
/settings/appearance   → Appearance settings (settings/Appeareance.svelte)
/scripts               → Script viewer (scripts.svelte)
/debug                 → Debug page (development) (Debug.svelte)
```

Page components live directly under `src/entrypoints/options/`, with feature subfolders `ruleset/`, `modules/`, and `settings/` — there is no `pages/` subdirectory.

**Key Components**:
- `command-nav.svelte`: Command palette for keyboard navigation
- `options-sidebar.svelte`: Navigation sidebar
- `editor.svelte`: Monaco editor integration with vim mode support
- `data-table.svelte`: Generic table component for rulesets/modules

### UI Component System

Uses shadcn-svelte components (bits-ui based) in `src/lib/components/ui/`:
- All UI components are customized variants of shadcn-svelte
- Styled with TailwindCSS v4 (using Vite plugin)
- Form validation via Zod schemas (client-side only)

### Path Aliases

```typescript
$lib     → src/lib/
$assets  → src/assets/
```

## Manifest Permissions

The extension requires:
- `storage`: For persisting rulesets and modules
- `tabs`: Access to tab information
- `userScripts`: Chrome's User Scripts API (requires Developer Mode or Allow User Scripts toggle in Chrome 138+)
- `scripting`: For script injection
- `host_permissions: <all_urls>`: To inject scripts on any site

## Browser Compatibility

**Chrome/Chromium**: Manifest V3, uses User Scripts API
- Chrome 138+: Requires "Allow User Scripts" toggle
- Chrome <138: Requires "Developer Mode"

**Firefox**: Manifest V2 (WXT auto-generates appropriate manifest)

## Code Style

Configured with Biome:
- Indentation: 2 spaces
- Line width: 80 characters
- Semicolons: as needed
- Quotes: single quotes (JS), double quotes (JSX)
- Trailing commas: all
- Arrow parentheses: always
- Svelte files excluded from Biome formatting/linting

## Development Notes

### URL Match Patterns

The extension uses browser extension match patterns for URL matching:
- Format: `<scheme>://<host>/<path>`
- Schema validation: `src/lib/schema.ts:UrlMatchPatternSchema`
- Special value: `<all_urls>` matches all sites
- Wildcards supported in scheme, host, and path

### External Module Updates

External modules track changes via three identifiers:
1. ETag header (primary)
2. Content-Length header (fallback)
3. Content hash (final verification)

Update logic in `ExtModuleStorage.updateContent()` uses HEAD request first to check headers before downloading full content.

### Monaco Editor Integration

Monaco editor configured via `vite-plugin-monaco-editor`:
- Vim mode support via `monaco-vim`
- User preference stored in settings (`local:settings`)
- Theme syncs with extension theme (mode-watcher)

## Known Issues

- Firefox: `browser.userScripts.getScripts()` doesn't work (commented out in Options.svelte:34-39)
- Development debug page available at `/#/debug`
- `RulesetStorage.create()` (`src/lib/storage.ts:31-42`) builds the new ruleset and pushes it into the in-memory array but never calls `this.item.setValue(rules)` — the new ruleset is not actually persisted
- `wxt.config.ts` still defines a `$pages` alias pointing at `src/entrypoints/options/pages/`, which no longer exists after the options page refactor — dead alias, safe to remove
