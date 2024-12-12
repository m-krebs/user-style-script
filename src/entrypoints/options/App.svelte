<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index';
  import OptionsSidebar from '$lib/components/options-sidebar.svelte';
  import { Button } from '$lib/components/ui/button/index';
  import { ModeWatcher, toggleMode } from 'mode-watcher';
  import { Moon, Sun } from 'lucide-svelte';

  const setIt = () => {
    storage.setItem('local:options', {
      rules: [{ name: 'abc', js: '' }],
      info: { version: 11 },
    });
  };
</script>

<ModeWatcher />
<Sidebar.Provider>
  <OptionsSidebar />
  <main>
    <Sidebar.Trigger />
    <h1>Options</h1>
    <Button onclick={toggleMode} variant="outline" size="icon">
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>

    {#await storage.getItem('local:options')}
      <p>waiting for storage</p>
    {:then value}
      <pre>{JSON.stringify(value, null, 2)}</pre>
      <!-- {#each Object.entries(value) as [key, value]} -->
      <!--   <li><strong>{key}:</strong> {value}</li> -->
      <!-- {/each} -->
    {:catch error}
      <p>Something went wrong: {error.message}</p>
    {/await}
    <Button onclick={setIt}>Update</Button>
  </main>
</Sidebar.Provider>
