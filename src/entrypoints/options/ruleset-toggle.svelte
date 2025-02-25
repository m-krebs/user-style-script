<script lang="ts">
  import Switch from '$lib/components/ui/switch/switch.svelte';

  let { onCheckedChange, checked, disabled } = $props();
</script>

{#if disabled}
  <Switch bind:checked {onCheckedChange} disabled />
{:else}
  <Switch bind:checked {onCheckedChange} />
{/if}
