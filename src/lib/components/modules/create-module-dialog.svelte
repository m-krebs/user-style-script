<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import { ExternalLink, LoaderCircle, PlusCircle } from 'lucide-svelte';
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';
  import { Switch } from '$lib/components/ui/switch';
  import { NoIDExtModuleSchema, type NoIDExtModule } from '$lib/schema';
  import { toast } from 'svelte-sonner';
  import { ExtModuleStorage } from '$lib/storage';

  let moduleForm: NoIDExtModule = $state({
    name: '',
    source: '',
    autoUpdate: false,
  });

  let open = $state(false);

  const moduleError = $state({
    name: '',
    source: '',
  });

  let disabled = $derived(moduleError.name != '' || moduleError.source != '');

  function validateName() {
    const Name = NoIDExtModuleSchema.pick({ name: true });

    const result = Name.safeParse({ name: moduleForm.name });

    if (result.success) {
      moduleError.name = '';
      return;
    }
    moduleError.name = result.error.issues[0].message;
    throw new Error(result.error.issues[0].message);
  }

  function validateSource() {
    const Source = NoIDExtModuleSchema.pick({ source: true });

    const result = Source.safeParse({ source: moduleForm.source });

    if (result.success) {
      moduleError.source = '';
      return;
    }
    moduleError.source = result.error.issues[0].message;
    throw new Error(result.error.issues[0].message);
  }

  let validating = $state(false);

  async function onclick() {
    try {
      validateName();
      validateSource();
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Module invalid');
        return;
      }
    }
    try {
      await createModule(moduleForm);
      open = false;
      moduleForm.name = '';
      moduleForm.source = '';
      moduleForm.autoUpdate = false;
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Module creation failed');
      }
    }
  }

  async function createModule(module: NoIDExtModule) {
    try {
      await ExtModuleStorage.add(module);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    toast.success(`Added Module ${moduleForm.name}`);
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button class="my-2 w-full" {...props}>
        Create new<PlusCircle />
      </Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Create module</Dialog.Title>
    </Dialog.Header>
    <div class="flex flex-col gap-2 pt-3">
      <Label for="name">Name</Label>
      <Input
        type="text"
        placeholder="Name"
        id="name"
        onfocusout={() => {
          try {
            validateName();
          } catch (error) {}
        }}
        bind:value={moduleForm!.name}
      />
      {#if moduleError.name}
        <p class="text-destructive">{moduleError.name}</p>
      {/if}
    </div>
    <div class="flex flex-col gap-1.5">
      <Label for="source">Source</Label>
      <Input
        type="text"
        placeholder="Source"
        id="source"
        onfocusout={() => {
          try {
            validateSource();
          } catch (error) {}
        }}
        bind:value={moduleForm!.source}
      />
      {#if moduleError.source}
        <p class="text-destructive">{moduleError.source}</p>
      {/if}
    </div>
    <div class="ml-0 flex flex-col gap-2">
      <Label for="autoupdate">Auto Update</Label>
      <Switch id="autoupdate" bind:checked={moduleForm!.autoUpdate} disabled />
    </div>
    <Button class="w-full" {onclick} {disabled}>
      Create
      {#if validating}
        <LoaderCircle class="animate-spin" />
      {:else}
        <PlusCircle />
      {/if}
    </Button>
  </Dialog.Content>
</Dialog.Root>
