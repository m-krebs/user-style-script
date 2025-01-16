<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import { Save } from 'lucide-svelte';
</script>

<div class="p-3">
  <div class="flex gap-2">
    <Input type="text" placeholder="Ruleset name" />
    <Input type="text" placeholder="URL pattern" />
    <Button><Save />Save</Button>
  </div>
</div>
