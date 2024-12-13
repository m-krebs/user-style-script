<script lang="ts">
  import { ModeWatcher } from 'mode-watcher';
  import OpenOptions from '$lib/components/open-options.svelte';
</script>

<ModeWatcher />
<main class="min-w-64">
  <div class="flex justify-between border-2 border-red-700 p-3">
    <div>
      <p>{browser.runtime.getManifest().name}</p>
      <p class="text-gray-500">v{browser.runtime.getManifest().version}</p>
    </div>
    <OpenOptions />
  </div>
</main>
