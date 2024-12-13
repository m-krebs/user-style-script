<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index';
  import OptionsSidebar from '$lib/components/options-sidebar.svelte';
  import { Button } from '$lib/components/ui/button/index';
  import { ModeWatcher, toggleMode } from 'mode-watcher';
  import { Moon, Sun } from 'lucide-svelte';
  import Editor from '$lib/components/editor.svelte';
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

    <Editor
      defaultValue={'body {\n\tposition: absolute\n\}'}
      language="css"
      vim
    />
    <Editor
      defaultValue={'console.log("Hello, world!")'}
      language="javascript"
    />
  </main>
</Sidebar.Provider>
