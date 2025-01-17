<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import { Save } from 'lucide-svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import { SidebarTrigger } from '$lib/components/ui/sidebar/index';
</script>

<div class="px-3">
  <div class="my-2 flex items-center justify-start gap-2">
    <SidebarTrigger class="p-4" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <span class="align-middle">Create new ruleset</span>
  </div>

  <div class="flex gap-2">
    <Input type="text" placeholder="Ruleset name" />
    <Input type="text" placeholder="URL pattern" />
  </div>
  <Button class="ml-auto">
    <Save />Create
  </Button>
</div>
