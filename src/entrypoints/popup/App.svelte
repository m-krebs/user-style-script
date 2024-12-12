<script lang="ts">
  import svelteLogo from '$assets/svelte.svg';
  import Counter from '$lib/Counter.svelte';
  import { Button } from '$lib/components/ui/button/index';
  import { ModeWatcher, toggleMode } from 'mode-watcher';
  import { Moon, Sun } from 'lucide-svelte';
</script>

<ModeWatcher />
<main>
  <div>
    <a href="https://wxt.dev" target="_blank" rel="noreferrer">
      <img src="/wxt.svg" class="logo" alt="WXT Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>WXT + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p class="read-the-docs">Click on the WXT and Svelte logos to learn more</p>

  <a href="/options.html" target="_blank">options</a>

  <Button variant="destructive">destructive</Button>

  <Button onclick={toggleMode} variant="outline" size="icon">
    <Sun
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #54bc4ae0);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
