<script lang="ts">
  import DataTable from '$lib/components/data-table.svelte';
  import { Plus } from 'lucide-svelte';
  import { columns, type Ruleset } from './ruleset-columns';
  import { Button } from '$lib/components/ui/button';
  import { RulesetStorage } from '$lib/storage';
  import { link } from 'svelte-spa-router';

  let data: Ruleset[] = $state([]);

  RulesetStorage.watch((changed) => {
    data = changed;
  });

  onMount(async () => {
    data = await RulesetStorage.getAll();
  });
</script>

<div>
  <a href="/ruleset-add" class="mr-0" use:link>
    <Button variant="ghost">Create new <Plus /></Button>
  </a>
  <DataTable bind:data {columns} />
</div>
