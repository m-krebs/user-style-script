<script lang="ts">
  import Switch from '$lib/components/ui/switch/switch.svelte';

  let { onCheckedChange, checked } = $props();
</script>

<Switch bind:checked {onCheckedChange} />
