<script lang="ts">
  import { SidebarTrigger } from '$lib/components/ui/sidebar/index';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import DataTable from '$lib/components/data-table.svelte';
  import { Plus } from 'lucide-svelte';
  import { columns, type Ruleset } from './ruleset-columns';
  import { Button } from '$lib/components/ui/button';
  import { RulesetStorage } from '$lib/storage';

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
    <span class="text-sm">Your rulesets</span>
  </div>
  <Separator class="mr-2 " />
  <div class="flex justify-between p-2">
    <Button href="#/ruleset-add" class="ml-auto">
      Create new <Plus />
    </Button>
  </div>
  <DataTable bind:data {columns} />
</div>
