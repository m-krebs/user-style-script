<script lang="ts">
  import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
  import { RulesetStorage } from '$lib/storage';
  import NotFound from './404.svelte';
    import { mode } from 'mode-watcher';
  import JSONTree from 'svelte-json-tree';

  let json = $state({
    storage: {},
    scripts: {},
  });

  onMount(async () => {
    const scripts = await browser.userScripts.getScripts();
    const storage = await RulesetStorage.getRules()

    json = {
      storage,
      scripts,
    };
  });

  let debug = $state(false);
  browser.management.getSelf((info) => {
    console.log(info)
    if (info.installType === 'development') {
      debug = true;
    }
  });

  let darkMode = $state(mode.current === 'dark')
</script>

{#if debug}
  <div class="p-4" class:dark-theme={darkMode} class:light-theme={!darkMode}>
    <ScrollArea class="rounded-md border p-4" >
      <JSONTree value={json} />
    </ScrollArea>
  </div>
{:else}
  <NotFound />
{/if}

<style>

:global(:root) {
	--json-tree-font-size: 12px;
	--json-tree-font-family: 'Courier New', Courier, monospace;
	--json-tree-li-indentation: 1em;
	--json-tree-li-line-height: 1.3;
}

:global(.dark-theme) {
	--json-tree-string-color: #7edcff;
	--json-tree-symbol-color: #7edcff;
	--json-tree-boolean-color: #8fa4ff;
	--json-tree-function-color: #8fa4ff;
	--json-tree-number-color: #a8a0ff;
	--json-tree-label-color: #e48eff;
	--json-tree-property-color: #ffffff;
	--json-tree-arrow-color: #bcbcbc;
	--json-tree-operator-color: #bcbcbc;
	--json-tree-null-color: #b3b3b3;
	--json-tree-undefined-color: #b3b3b3;
	--json-tree-date-color: #b3b3b3;
	--json-tree-internal-color: #cccccc;
	--json-tree-regex-color: #ff7d80;
}

:global(.light-theme) {
	--json-tree-string-color: #0077aa;
	--json-tree-symbol-color: #0077aa;
	--json-tree-boolean-color: #5555cc;
	--json-tree-number-color: #8800cc;
	--json-tree-property-color: #222222;
	--json-tree-arrow-color: #666666;
	--json-tree-operator-color: #666666;
}
 
</style>
