<script lang="ts">
  import { AlertTriangle } from 'lucide-svelte';
  import { ModeWatcher } from 'mode-watcher';
  import Router from 'svelte-spa-router';
  import CommandNav from '$lib/components/command-nav.svelte';
  import OptionsSidebar from '$lib/components/options-sidebar.svelte';
  import * as Sidebar from '$lib/components/ui/sidebar/index';
  import { Toaster } from '$lib/components/ui/sonner/index';
  import { isUserScriptsAvailable } from '$lib/utils';
  import Debug from '$pages/Debug.svelte';
  import Modules from './modules.svelte';
  import Options from './Options.svelte';
  import NotFound from './pages/404.svelte';
  import Appeareance from './pages/settings/Appeareance.svelte';
  import Settings from './pages/settings/Settings.svelte';
  import Add from './ruleset/add.svelte';
  import RulesetDetail from './ruleset-detail.svelte';
  import Scripts from './scripts.svelte';

  const routes = {
    '/': Options,
    '/debug': Debug,
    '/modules': Modules,
    '/ruleset/add': Add,
    '/ruleset/*': RulesetDetail,
    '/settings': Settings,
    '/settings/appearance': Appeareance,
    '/scripts': Scripts,
    '*': NotFound,
  };

  let userScriptsNotification = $state(true);

  onMount(() => {
    if (!isUserScriptsAvailable()) {
      setInterval(() => {
        if (isUserScriptsAvailable()) location.reload();
        userScriptsNotification = false;
      }, 100);
    }

    setInterval(() => {
      if (!isUserScriptsAvailable() && userScriptsNotification) {
        userScriptsNotification = false;
        location.reload();
      }
    }, 2000);
  });

  let version = Number(
    navigator.userAgent.match(/(Chrome|Chromium)\/([0-9]+)/)?.[2],
  );
</script>

<ModeWatcher />
<Toaster richColors expand />
{#if !isUserScriptsAvailable()}
  <div
    class="mx-auto flex flex-col items-center justify-center gap-3 p-5 align-middle text-xl text-orange-500"
  >
    <AlertTriangle />
    <p>
      For the extension to work, Chrome requires
      {#if version >= 138}
        <b>Allow User Scripts</b> to be toggled
      {:else}
        <b>Developer mode</b> to be enabled
      {/if}
    </p>
    <div class="text-white">
      More on that can be read
      {#if version >= 138}
        <a
          href="https://developer.chrome.com/docs/extensions/reference/api/userScripts#chrome_versions_138_and_newer_allow_user_scripts_toggle"
          target="_blank"
          class="underline">here</a
        >
      {:else}
        <a
          href="https://developer.chrome.com/docs/extensions/reference/api/userScripts#chrome_versions_prior_to_138_developer_mode_toggle"
          target="_blank"
          class="underline">here</a
        >
      {/if}
    </div>
  </div>
{:else}
  <Sidebar.Provider>
    <OptionsSidebar />
    <main class="w-full">
      <CommandNav />
      <Router {routes} />
    </main>
  </Sidebar.Provider>
{/if}
