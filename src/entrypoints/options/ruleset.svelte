<script lang="ts">
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { BadgeCheck, BadgeX, Check, PlusCircle } from 'lucide-svelte';
  import { cn } from '$lib/utils.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import Editor from '$lib/components/editor.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import {
    UrlMatchPatternSchema,
    type ExtModule,
    type NoIdRuleset,
    type Ruleset,
  } from '$lib/schema';
  import { ExtModuleStorage } from '$lib/storage';

  let { ruleset }: { ruleset?: Ruleset } = $props();

  let formRuleset: Ruleset | NoIdRuleset | undefined = $state(
    ruleset ?? {
      name: '',
      active: true,
      created: Date.now(),
      updated: Date.now(),
      modules: [],
      urls: '',
    },
  );

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

  function validateUrlPattern() {
    const urls = formRuleset?.urls.split(',');
    const matches: string[] = [];
    const excludeMatches: string[] = [];

    const urlInput = document.getElementById('url-input');
    try {
      urls?.forEach((url) => {
        url = url.trimStart();
        if (url === '') return;
        UrlMatchPatternSchema.parse(url);
        url.startsWith('!')
          ? excludeMatches.push(url.substring(1))
          : matches.push(url);

        urlInput!.classList.contains('border-red-600')
          ? urlInput?.classList.remove('border-red-600')
          : null;
      });
    } catch (error) {
      urlInput!.classList.contains('border-red-600')
        ? null
        : urlInput?.classList.add('border-red-600');
    }
  }

  function onclick() {
    // TODO: submit
  }
</script>

<div class="mt-2 flex gap-2">
  <Input
    type="text"
    placeholder="Name"
    class="basis-2/6"
    bind:value={formRuleset!.name}
  />
  <div class="relative w-full">
    <Input
      type="text"
      placeholder="https://example.com/*,!https://example.com/not_here"
      bind:value={formRuleset!.urls}
      onfocusout={validateUrlPattern}
      id="url-input"
    />
    <div class="absolute right-3 top-2">
      <!--TODO: change on validate-->
      {#if true}
        <BadgeCheck color="#67d45e" />
      {:else}
        <BadgeX color="#dc2626" />
      {/if}
    </div>
  </div>
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
          {#if modules.length == 0}
            <Command.Item disabled>
              <Check class="invisible" />No modules found.
            </Command.Item>
          {/if}
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
  <Button class="ml-auto" {onclick}>
    <PlusCircle />Create
  </Button>
</div>
<div class="mt-2 flex h-full">
  <Editor class="w-full" />
  <Editor class="w-full" language="scss" placeholder="Type SCSS/CSS here" />
</div>
