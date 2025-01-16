<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index';
  import { ModeWatcher } from 'mode-watcher';
  import OptionsSidebar from '$lib/components/options-sidebar.svelte';
  import Router from 'svelte-spa-router';
  import RulesetDetail from './RulesetDetail.svelte';
  import RulesetAdd from './RulesetAdd.svelte';
  import { Toaster } from '$lib/components/ui/sonner/index';
  import Modules from './Modules.svelte';
  import Options from './Options.svelte';
  import Settings from './Settings.svelte';
  import Reroute from './Reroute.svelte';

  const routes = {
    '/': Options,
    '/modules': Modules,
    '/ruleset/*': RulesetDetail,
    '/ruleset-add': RulesetAdd,
    '/settings': Settings,
    '*': Reroute,
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
</script>

<ModeWatcher />
<Toaster richColors />
<Sidebar.Provider>
  <OptionsSidebar />
  <Sidebar.Trigger />
  <main class="w-full">
    <Router {routes} />
  </main>
</Sidebar.Provider>
