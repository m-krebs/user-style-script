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
  import {
    RulesetContent,
    type ExtModule,
    type NoIdRuleset,
    type Ruleset,
  } from '$lib/schema';
  import { ExtModuleStorage } from '$lib/storage';

  let { ruleset }: { ruleset: Ruleset } = $props();

  let formRuleset: Ruleset = $state(ruleset);

  let modules: ExtModule[] = $state([]);

  onMount(async () => {
    modules = await ExtModuleStorage.getAll();
  });

  ExtModuleStorage.watch((newModuleList) => {
    modules = newModuleList;
  });

  let open = $state(false);
  let ref = $state<HTMLButtonElement>(null!);

  let moduleLength = $derived(formRuleset?.modules.length);

  let rulesetContent = async () =>
    await storage
      .defineItem<RulesetContent>(`local:${formRuleset?.id}`, {})
      .getValue();
</script>

<div class="mt-2 flex gap-2">
  <Input
    type="text"
    placeholder="Ruleset name"
    class="basis-2/6"
    bind:value={formRuleset!.name}
  />
  <Input type="text" placeholder="URL pattern" bind:value={formRuleset!.urls} />
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
          {:else if formRuleset?.modules.length == 1}
            {modules.find((item) => item.id === formRuleset?.modules[0]).name}
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
          {#each modules as module}
            <Command.Item
              onSelect={() => {
                console.log(module.id);
                const index = formRuleset?.modules.findIndex(
                  (item) => item === module.id,
                );

                console.log(index);

                if (index !== -1 && index !== undefined) {
                  formRuleset?.modules.splice(index, 1);
                } else {
                  formRuleset?.modules.push(module.id);
                }
              }}
            >
              <Check
                class={cn(
                  !formRuleset?.modules.find((item) => item === module.id) &&
                    'text-transparent',
                )}
              />
              {module.name}
            </Command.Item>
          {/each}
        </Command.List>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
  <Button class="ml-auto">
    <Save />Save
  </Button>
</div>
<div class="mt-2 flex h-full">
  {#await rulesetContent}
    Loading...
  {:then data}
    {data.js}
  {/await}
  <Editor class="w-full" />
  <Editor class="w-full" language="scss" placeholder="Type SCSS/CSS here" />
</div>
