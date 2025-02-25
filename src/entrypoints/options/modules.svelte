<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
  import { columns } from './extmodule-columns';
  import { ExtModuleStorage } from '$lib/storage';
  import { SidebarTrigger } from '$lib/components/ui/sidebar/index';
  import DataTable from '$lib/components/data-table.svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import type { NoIDExtModule, ExtModule } from '$lib/schema';
  import CreateModuleDialog from '$lib/components/modules/create-module-dialog.svelte';

  let data: ExtModule[] = $state([]);

  ExtModuleStorage.watch((changed) => {
    data = changed;
  });

  onMount(async () => {
    data = await ExtModuleStorage.getAll();
  });

  $inspect(data);
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
  <CreateModuleDialog />
  <DataTable bind:data {columns} />
</div>
