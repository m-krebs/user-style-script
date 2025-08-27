<script lang="ts">
  import OptionsSidebar from '$lib/components/options-sidebar.svelte';
  import * as Sidebar from '$lib/components/ui/sidebar/index';
  import { Toaster } from '$lib/components/ui/sonner/index';
  import { isUserScriptsAvailable } from '$lib/utils';
  import { AlertTriangle } from 'lucide-svelte';
  import { ModeWatcher } from 'mode-watcher';
  import Router from 'svelte-spa-router';
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
    '/modules': Modules,
    '/ruleset/add': Add,
    '/ruleset/*': RulesetDetail,
    '/settings': Settings,
    '/settings/appearance': Appeareance,
    '/scripts': Scripts,
    '*': NotFound,
  };

  // onMount(() => {
  // browser.userScripts.configureWorld({
  //   csp: "script-src 'self'",
  // });
  // createUserScript({
  //   id: 'test',
  //   matches: ['https://*.google.com/*'],
  //   js: 'alert("Ding dong")',
  // });
  // });

  onMount(() => {
    if (!isUserScriptsAvailable()) {
      setInterval(() => {
        if (isUserScriptsAvailable()) location.reload();
      }, 500);
    }
  });
</script>

<ModeWatcher />
<Toaster richColors expand />
{#if !isUserScriptsAvailable()}
  <div
    class="mx-auto flex flex-col items-center justify-center gap-3 p-5 align-middle text-xl text-orange-500"
  >
    <AlertTriangle />
    For the extension to work, chrome requires developer mode to be enabled.
    <div class="text-white">
      More on that can be read
      <a
        href="https://developer.chrome.com/docs/extensions/reference/api/userScripts#developer_mode_for_extension_users"
        target="_blank"
        class="underline">here</a
      >
      .
    </div>
  </div>
{:else}
  <Sidebar.Provider>
    <OptionsSidebar />
    <main class="w-full">
      <Router {routes} />
    </main>
  </Sidebar.Provider>
{/if}
