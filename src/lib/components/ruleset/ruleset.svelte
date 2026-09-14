<script lang="ts">
  import Editor from '$lib/components/editor.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import {
    type ExtModule,
    type NoIdRuleset,
    type Ruleset,
  } from '$lib/schema';
  import { ExtModuleStorage, RulesetStorage } from '$lib/storage';
  import { BadgeCheck, BadgeX, CirclePlus } from '@lucide/svelte';
  import ModuleSelector from '$lib/components/ruleset/ModuleSelector.svelte';
  import UrlInput from '$lib/components/ruleset/UrlInput.svelte';

  let { ruleset, submitFunction }: { ruleset?: Ruleset, submitFunction: Function } = $props();


  let formRuleset: Ruleset | NoIdRuleset = $state(
      ruleset ?? {
      name: '',
      active: true,
      created: Date.now(),
      updated: Date.now(),
      modules: [],
      urls: '',
    },
  );
  let urlInputValid = $state(false)
  let modules: ExtModule[] = $state([]);

  onMount(async () => {
    modules = await ExtModuleStorage.getAll();
  });

  ExtModuleStorage.watch((updatedModules) => {
    modules = updatedModules;
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
    <UrlInput value={formRuleset!.urls} isValid={urlInputValid} />
    <div class="absolute right-3 top-2">
      <!--TODO: change on validate-->
      {#if true}
        <BadgeCheck color="#67d45e" />
      {:else}
        <BadgeX color="#dc2626" />
      {/if}
    </div>
  </div>
  <ModuleSelector ruleset={formRuleset} {modules} />
  <Button class="ml-auto" onclick={()=>submitFunction(formRuleset)}>
    <CirclePlus />Create
  </Button>
</div>
<div class="mt-2 flex h-full">
  <Editor class="w-full" valueUpdated=""/>
  <Editor class="w-full" language="scss" placeholder="Type SCSS/CSS here" valueUpdated="" />
</div>
