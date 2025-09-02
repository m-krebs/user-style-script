<script lang="ts">
  import DataTable from '$lib/components/data-table.svelte';
  import { Button } from '$lib/components/ui/button';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import { SidebarTrigger } from '$lib/components/ui/sidebar/index';
  import type { Ruleset } from '$lib/schema';
  import { RulesetStorage } from '$lib/storage';
  import { PlusCircle } from 'lucide-svelte';
  import { columns } from './ruleset-columns';

  let data: Ruleset[] = $state([]);

  RulesetStorage.watch((changed) => {
    data = changed;
  });

  onMount(async () => {
    data = await RulesetStorage.getAll();
  });
</script>

<div class="px-3">
  <div class="my-2 flex items-center justify-start gap-2">
    <SidebarTrigger class="p-4" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <span class="text-sm">Rulesets</span>
  </div>
  <Separator class="mr-2" />
  <Button href="#/ruleset/add" class="my-2 w-full">
    Create new<PlusCircle />
  </Button>
  <DataTable bind:data {columns} />

  <!-- FIXME: this doesn't work in firefox -->
  <!-- {#await browser.userScripts.getScripts()} -->
  <!--   <div>Loading</div> -->
  <!-- {:then data} -->
  <!--   <div>{JSON.stringify(data)}</div> -->
  <!-- {/await} -->
</div>
