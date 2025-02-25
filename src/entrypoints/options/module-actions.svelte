<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import * as Dialog from '$lib/components/ui/dialog/index';
  import {
    CloudDownload,
    LoaderCircle,
    Pencil,
    Save,
    Trash,
  } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import Input from '$lib/components/ui/input/input.svelte';
  import { ExtModuleStorage } from '$lib/storage';
  import Switch from '$lib/components/ui/switch/switch.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import type { ExtModule } from '$lib/schema';
  import { toast } from 'svelte-sonner';

  let { id } = $props();

  let open = $state(false);
  let dialogOpen = $state(false);
  let module: ExtModule | undefined = $state();
  let refreshFinished = $state(true);

  onMount(async () => {
    module = await ExtModuleStorage.get(id);
  });

  ExtModuleStorage.watch((newModule) => {
    module = newModule.filter((m) => m.id == id)[0];
  });

  async function saveModule(mod: ExtModule) {
    try {
      const result = await ExtModuleStorage.update(mod);
      if (result.success) toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      open = false;
    }
  }
  async function deleteModule(module: ExtModule) {
    try {
      const result = await ExtModuleStorage.delete(id);
      if (result.success) toast.success(`Deleted module ${module!.name}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  async function updateContent() {
    refreshFinished = false;
    try {
      const result = await ExtModuleStorage.updateContent(id);
      if (result.success == false) toast.info(result.message);
      else toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    }
    refreshFinished = true;
  }
</script>

<Button
  variant="ghost"
  size="icon"
  onclick={updateContent}
  disabled={!refreshFinished}
>
  {#if !refreshFinished}
    <LoaderCircle class="animate-spin" />
  {:else}
    <CloudDownload />
  {/if}
</Button>
<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button variant="ghost" size="icon" {...props}>
        <Pencil />
      </Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit module</Dialog.Title>
    </Dialog.Header>
    <div class="flex flex-col gap-2 pt-3">
      <Label for="name">Name</Label>
      <Input
        type="text"
        placeholder="Name"
        id="name"
        bind:value={module!.name}
      />
    </div>
    <div class="flex flex-col gap-1.5">
      <Label for="source">Source</Label>
      <Input
        type="text"
        placeholder="Source"
        id="source"
        bind:value={module!.source}
      />
    </div>
    <div class="flex flex-col gap-2">
      <Label for="autoupdate">Auto Update</Label>
      <Switch id="autoupdate" bind:checked={module!.autoUpdate} />
    </div>
    <div class="flex gap-3">
      <Button
        variant="outline"
        class="w-full"
        onclick={updateContent}
        disabled={!refreshFinished}
      >
        {#if !refreshFinished}
          <LoaderCircle class="animate-spin" />
        {/if}
        <CloudDownload /> Manual Refresh
      </Button>
      <Button class="w-full" onclick={() => saveModule(module as ExtModule)}
        ><Save />Save</Button
      >
    </div>
  </Dialog.Content>
</Dialog.Root>

<AlertDialog.Root bind:open={dialogOpen}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>
        Delete Module <i>{module!.name}</i>
      </AlertDialog.Title>
      <AlertDialog.Description>
        Are you sure? This will permanently delete the module.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>
        {#snippet child()}
          <Button
            variant="destructive"
            onclick={() => {
              deleteModule(module as ExtModule);
              dialogOpen = false;
            }}>Delete</Button
          >
        {/snippet}
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
  <AlertDialog.Trigger>
    {#snippet child({ props })}
      <Button variant="ghost" size="icon" class="text-red-600" {...props}>
        <Trash />
      </Button>
    {/snippet}
  </AlertDialog.Trigger>
</AlertDialog.Root>
