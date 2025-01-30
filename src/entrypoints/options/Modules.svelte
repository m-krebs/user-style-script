<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
  import { columns } from './extmodule-columns';
  import { ExtModuleStorage } from '$lib/storage';
  import { SidebarTrigger } from '$lib/components/ui/sidebar/index';
  import DataTable from '$lib/components/data-table.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import type { NoIDExtModule, ExtModule } from '$lib/schema';
  import Button from '$lib/components/ui/button/button.svelte';
  import { PlusCircle } from 'lucide-svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';
  import { Switch } from '$lib/components/ui/switch';
  import { toast } from 'svelte-sonner';

  let data: ExtModule[] = $state([]);
  let open = $state(false);

  ExtModuleStorage.watch((changed) => {
    data = changed;
  });

  let moduleForm: NoIDExtModule = $state({
    name: '',
    source: '',
    autoUpdate: false,
  });

  function moduleFormReset() {
    moduleForm = {
      name: '',
      source: '',
      autoUpdate: false,
    };
  }

  function createModule() {
    ExtModuleStorage.add(moduleForm);

    open = false;
    moduleFormReset();
    toast.success(`Added Module ${moduleForm.name}`);
  }

  onMount(async () => {
    data = await ExtModuleStorage.getAll();
  });
</script>

<div class="px-3">
  <div class="my-2 flex items-center justify-start gap-2">
    <SidebarTrigger class="p-4" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>External Modules</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </div>
  <Separator />

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
        <Dialog.Title>Add new module</Dialog.Title>
      </Dialog.Header>
      <div class="flex flex-col gap-2 pt-3">
        <Label for="name">Name</Label>
        <Input
          type="text"
          placeholder="Name"
          id="name"
          bind:value={moduleForm!.name}
        />
      </div>
      <div class="flex flex-col gap-1.5">
        <Label for="source">Source</Label>
        <Input
          type="text"
          placeholder="Source"
          id="source"
          bind:value={moduleForm!.source}
        />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="autoupdate">Auto Update</Label>
        <Switch id="autoupdate" bind:checked={moduleForm!.autoUpdate} />
      </div>
      <Button class="w-full" onclick={createModule}><PlusCircle />Create</Button
      >
    </Dialog.Content>
  </Dialog.Root>
  <DataTable bind:data {columns} />
</div>
