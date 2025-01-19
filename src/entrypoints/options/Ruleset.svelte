<script lang="ts">
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { Check } from 'lucide-svelte';
  import { cn } from '$lib/utils.js';
  import { Save } from 'lucide-svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import Editor from '$lib/components/editor.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import type { ExtModule } from '$lib/schema';
  import { ExtModuleStorage } from '$lib/storage';

  let { rulesetId }: { rulesetId?: string } = $props();

  if (rulesetId) {
  }

  let modules: ExtModule[] = $state([]);
  type moduleList = typeof modules;

  onMount(async () => {
    modules = await ExtModuleStorage.getAll();
  });

  ExtModuleStorage.watch((newModuleList) => {
    modules = newModuleList;
    selectedModules = [];
  });

  let open = $state(false);
  let ref = $state<HTMLButtonElement>(null!);

  let selectedModules: moduleList = $state([]);
  let moduleLength = $derived(selectedModules.length);
</script>

<div class="mt-2 flex gap-2">
  <Input type="text" placeholder="Ruleset name" class="basis-2/6" />
  <Input type="text" placeholder="URL pattern" />
  <Popover.Root bind:open>
    <Popover.Trigger bind:ref>
      {#snippet child({ props })}
        <Button
          variant="outline"
          class="w-[300px] justify-between"
          {...props}
          role="combobox"
          aria-expanded={open}
        >
          {#if moduleLength == 0}
            {'Select modules...'}
          {:else if moduleLength == 1}
            {selectedModules[0].name}
          {:else}
            {moduleLength}{' selected'}
          {/if}
          <ChevronsUpDown class="opacity-50" />
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-[300px] p-0">
      <Command.Root>
        <Command.Input placeholder="Search external modules..." />
        <Command.List>
          <Command.Empty>No module found.</Command.Empty>
          <Command.Group>
            {#each modules as framework}
              <Command.Item
                onSelect={() => {
                  const index = selectedModules.findIndex(
                    (item) => item.id === framework.id,
                  );

                  if (index !== -1) {
                    selectedModules.splice(index, 1);
                  } else {
                    selectedModules.push(framework);
                  }
                }}
              >
                <Check
                  class={cn(
                    !selectedModules.find((item) => item.id === framework.id) &&
                      'text-transparent',
                  )}
                />
                {framework.name}
              </Command.Item>
            {/each}
          </Command.Group>
        </Command.List>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
  <Button class="ml-auto">
    <Save />Save
  </Button>
</div>
<div class="mt-2 flex h-full">
  <Editor class="w-full" />
  <Editor class="w-full" language="scss" placeholder="Type SCSS/CSS here" />
</div>
