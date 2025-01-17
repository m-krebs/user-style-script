<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import * as Tooltip from '$lib/components/ui/tooltip/index';
  import { Pencil, Trash } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button/index.js';

  let { editRuleset, deleteRuleset, name } = $props();
</script>

<Tooltip.Provider>
  <Tooltip.Root delayDuration={300}>
    <Tooltip.Content>
      <p>Edit Ruleset</p>
    </Tooltip.Content>
    <Tooltip.Trigger>
      {#snippet child()}
        <Button variant="ghost" size="icon" onclick={editRuleset}>
          <Pencil />
        </Button>
      {/snippet}
    </Tooltip.Trigger>
  </Tooltip.Root>
</Tooltip.Provider>
<AlertDialog.Root>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>
        Delete Ruleset <code>`{name}`</code>
      </AlertDialog.Title>
      <AlertDialog.Description>
        Are you sure? This will permanently delete the ruleset.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>
        {#snippet child()}
          <Button variant="destructive" onclick={deleteRuleset}>Delete</Button>
        {/snippet}
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
  <AlertDialog.Trigger>
    {#snippet child({ props })}
      <Button variant="ghost" size="icon" class="text-red-600" {...props}>
        <Trash />
      </Button>
    {/snippet}
  </AlertDialog.Trigger>
</AlertDialog.Root>
