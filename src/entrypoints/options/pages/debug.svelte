<script lang="ts">
  import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
  import { RulesetStorage } from '$lib/storage';
  import NotFound from '$pages/404.svelte';

  import JSONTree from 'svelte-json-tree';

  let json = $state({
    storage: {},
    scripts: {},
  });

  onMount(async () => {
    const scripts = await browser.userScripts.getScripts();
    const storage = await RulesetStorage.item.getValue();

    json = {
      storage,
      scripts,
    };
  });

  let debug = $state(false);
  browser.management.getSelf((info) => {
    if (info.installType === 'development') {
      debug = true;
    }
  });
</script>

{#if debug}
  <div class="p-4">
    <ScrollArea class="rounded-md border bg-white p-4">
      <JSONTree value={json} />
    </ScrollArea>
  </div>
{:else}
  <NotFound />
{/if}
