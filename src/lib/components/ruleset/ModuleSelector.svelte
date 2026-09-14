<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { type ExtModule } from '$lib/schema';
  import { cn } from '$lib/utils';
  import { Check, ChevronsUpDown } from '@lucide/svelte';

  let { modules, ruleset } = $props();

  let moduleLength = $derived(ruleset.modules.length);
  let open = $state(false)

  let ref = $state<HTMLButtonElement>(null!);
</script>

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
          {:else if ruleset.modules.length == 1}
            {modules.find((item: ExtModule) => item.id === ruleset?.modules[0]).name}
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
          {#if modules.length == 0}
            <Command.Item disabled>
              <Check class="invisible" />No modules found.
            </Command.Item>
          {/if}
          {#each modules as module}
            <Command.Item
              onSelect={() => {
                const index = ruleset?.modules.findIndex(
                  (item: ExtModule) => item === module.id,
                );


                if (index !== -1 && index !== undefined) {
                  ruleset?.modules.splice(index, 1);
                } else {
                  ruleset?.modules.push(module.id);
                }
              }}
            >
              <Check
                class={cn(
                  !ruleset?.modules.find((item: ExtModule) => item === module.id) &&
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

