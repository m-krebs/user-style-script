<script lang="ts">
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { Check, Save, BadgeCheck, BadgeX } from 'lucide-svelte';
  import { cn } from '$lib/utils.js';
  import {} from 'lucide-svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import Editor from '$lib/components/editor.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import {
    type RulesetContent,
    type ExtModule,
    type Ruleset,
    UrlMatchPatternSchema,
  } from '$lib/schema';
  import { ExtModuleStorage, RulesetStorage } from '$lib/storage';
  import { toast } from 'svelte-sonner';

  let { ruleset }: { ruleset: Ruleset } = $props();
  let formRuleset: Ruleset = $state(ruleset);
  let modules: ExtModule[] = $state([]);

  ExtModuleStorage.watch((newModuleList) => {
    modules = newModuleList;
  });

  let open = $state(false);
  let ref = $state<HTMLButtonElement>(null!);

  console.log(formRuleset);

  let modulesSelectedLength = $derived(formRuleset?.modules.length);

  let rulesetContent = storage.defineItem<RulesetContent>(
    `local:${formRuleset?.id}`,
    {},
  );

  let jsValue = $state('');
  let cssValue = $state('');

  async function updateRuleset() {
    try {
      await RulesetStorage.update({
        ...formRuleset,
        updated: Date.now(),
        modules: $state.snapshot(formRuleset.modules),
      });

      await rulesetContent.setValue({ js: jsValue, css: cssValue });
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      return;
    }

    toast.success('Updated ruleset');
  }

  const rulesetError = $state({
    name: '',
    urls: 'asdf',
  });

  let validUrl = $state(true);

  function validateUrlPattern() {
    const urls = formRuleset?.urls.split(',');
    const matches: string[] = [];
    const excludeMatches: string[] = [];

    try {
      urls?.forEach((url) => {
        url = url.trimStart();
        if (url === '') return;
        UrlMatchPatternSchema.parse(url);
        url.startsWith('!')
          ? excludeMatches.push(url.substring(1))
          : matches.push(url);
      });
      validUrl = true;
    } catch (error) {
      validUrl = false;
    }
  }

  function onclick() {
    validateUrlPattern();
    updateRuleset();
  }

  onMount(async () => {
    jsValue = (await rulesetContent.getValue()).js;
    cssValue = (await rulesetContent.getValue()).css;
  });
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
      placeholder="URL pattern"
      bind:value={formRuleset!.urls}
      oninput={validateUrlPattern}
      class={validUrl ? '' : 'border-red-600'}
    />
    <div class="absolute right-3 top-2">
      {#if validUrl}
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
          {#if modulesSelectedLength == 0}
            {'Select modules...'}
          {:else if modulesSelectedLength == 1}
            {#await ExtModuleStorage.getAll() then modules}
              {modules.find((item) => item.id === formRuleset?.modules[0]).name}
            {/await}
          {:else}
            {modulesSelectedLength}{' selected'}
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
          {#await ExtModuleStorage.getAll() then modules}
            {#if modules.length === 0}
              <Command.Item disabled>No External Modules</Command.Item>
            {/if}
            {#each modules as module}
              <Command.Item
                onSelect={() => {
                  console.log(module.id);
                  const index = formRuleset?.modules.findIndex(
                    (item) => item === module.id,
                  );
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
          {/await}
        </Command.List>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
  <Button class="ml-auto" {onclick}>
    <Save />Save
  </Button>
</div>
<div class="mt-2 flex h-full">
  {#await rulesetContent.getValue() then data}
    <Editor
      class="w-full"
      value={data?.js}
      valueUpdated={(value: string) => (jsValue = value)}
    />
    <Editor
      class="w-full"
      language="scss"
      placeholder="Type SCSS/CSS here"
      value={data?.css}
      valueUpdated={(value: string) => (cssValue = value)}
    />
  {/await}
</div>
