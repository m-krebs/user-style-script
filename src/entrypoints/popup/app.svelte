<script lang="ts">
  import { CircleAlert } from 'lucide-svelte';
  import { isUserScriptsAvailable } from '$lib/utils';
  import { ModeWatcher } from 'mode-watcher';
  import OpenOptions from '$lib/components/open-options.svelte';

  const onclick = () => browser.runtime.openOptionsPage();
</script>

<ModeWatcher />
<main class="min-w-64">
  {#if !isUserScriptsAvailable()}
    <button
      type="button"
      {onclick}
      class="w-full hover:backdrop-brightness-200"
    >
      <div class="flex items-center justify-center gap-3 p-5 text-orange-500">
        <CircleAlert />Developer Mode Disabled. <br />Injection will not work!
      </div>
    </button>
  {:else}
    <div class="flex justify-between border-2 p-3">
      <div>
        <p>{browser.runtime.getManifest().name}</p>
        <p class="text-gray-500">v{browser.runtime.getManifest().version}</p>
      </div>
      <OpenOptions />
    </div>
  {/if}
</main>
