<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { CloudDownload, Pencil, Save, Trash } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import Input from '$lib/components/ui/input/input.svelte';
  import { ExtModuleStorage } from '$lib/storage';
  import Switch from '$lib/components/ui/switch/switch.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  import type { ExtModule } from '$lib/schema';
  import { toast } from 'svelte-sonner';

  let { id } = $props();

  let form: ExtModule | undefined = $state();
  onMount(async () => {
    form = await ExtModuleStorage.get(id);
  });
  ExtModuleStorage.watch((newModule) => {
    form = newModule.filter((m) => m.id == id)[0];
  });

  const saveModule = async () => {
    if (form !== undefined) ExtModuleStorage.add(form);
    updateContent();
    toast.success('Module saved');
  };
  const deleteModule = async () => {
    if (form !== undefined) ExtModuleStorage.delete(id);
    toast.success('Module deleted!');
  };

  async function fetchScript(url: any) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch module ${response.statusText}`);
    }
    return await response.text();
  }
  const updateContent = async () => {
    try {
      const text = await fetchScript(form!.source);
      form!.content = `${text}`;
      toast.success('Module content updated');
    } catch (error) {
      toast.error(`Failed to fetch module`);
    }
  };
</script>

{#await ExtModuleStorage.get(id) then module}
  <Button variant="ghost" size="icon" onclick={updateContent}>
    <CloudDownload />
  </Button>
  <Dialog.Root>
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Button variant="ghost" size="icon" {...props}>
          <Pencil />
        </Button>
      {/snippet}
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Edit Module</Dialog.Title>
      </Dialog.Header>
      <div class="flex flex-col gap-1.5">
        <Label for="name">Name</Label>
        <Input
          type="text"
          placeholder="Name"
          id="name"
          bind:value={form!.name}
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label for="source">Source</Label>
        <Input
          type="text"
          placeholder="Source"
          id="source"
          bind:value={form!.source}
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label for="autoupdate">Auto Update</Label>
        <Switch id="autoupdate" bind:checked={form!.autoUpdate} />
      </div>
      <div class="flex">
        <Button variant="ghost" class="w-full" onclick={updateContent}>
          <CloudDownload /> Manual Refresh
        </Button>
        <Button class="w-full" onclick={saveModule}><Save />Save</Button>
      </div>
    </Dialog.Content>
  </Dialog.Root>

  <AlertDialog.Root>
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
            <Button variant="destructive">Delete</Button>
          {/snippet}
        </AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
    <AlertDialog.Trigger>
      {#snippet child({ props })}
        <Button
          variant="ghost"
          size="icon"
          class="text-red-600"
          {...props}
          onclick={deleteModule}
        >
          <Trash />
        </Button>
      {/snippet}
    </AlertDialog.Trigger>
  </AlertDialog.Root>
{/await}
