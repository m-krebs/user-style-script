<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { Home } from 'lucide-svelte';
</script>

<div class="flex flex-col items-center gap-3 p-7">
  <div class="text-xl">Ups, we could not find what you were looking for.</div>

  <Button href="#/"><Home />Go back home</Button>
</div>
