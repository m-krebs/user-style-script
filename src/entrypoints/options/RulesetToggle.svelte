<script lang="ts">
  import { RulesetStorage } from '$lib/storage';
  import Switch from '$lib/components/ui/switch/switch.svelte';

  let { id, checked } = $props();

  const onCheckedChange = async () => {
    const ruleset = await RulesetStorage.get(id);
    if (ruleset == undefined) return;

    ruleset.active = checked;

    RulesetStorage.add(ruleset);
  };
</script>

<Switch bind:checked {onCheckedChange} />
