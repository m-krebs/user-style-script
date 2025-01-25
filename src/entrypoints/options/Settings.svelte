<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import { SidebarTrigger } from '$lib/components/ui/sidebar/index';
  import SettingsSelect from './SettingsSelect.svelte';

  let { params } = $props();

  const settingsPages = [
    {
      value: 'general',
      label: 'General',
    },
    {
      value: 'appearance',
      label: 'Appearance',
    },
  ];
  let value = $state(settingsPages[0].value);
  let selectedLabel = $derived(
    value ? settingsPages.find((p) => p.value === value)?.label : 'Select page',
  );

  $inspect(selectedLabel);
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
          <Breadcrumb.Page>
            <SettingsSelect items={settingsPages} bind:selected={value} />
          </Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </div>
  <Separator />
  <div class="flex justify-between py-2"></div>
  {value}
</div>
