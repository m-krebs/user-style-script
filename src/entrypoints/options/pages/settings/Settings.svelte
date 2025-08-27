<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import { SidebarTrigger } from '$lib/components/ui/sidebar/index';
  import Appeareance from './Appeareance.svelte';
  import General from './General.svelte';
  import SettingsSelect from './SettingsSelect.svelte';

  const settingsPages = [
    {
      value: 'general',
      label: 'General',
      component: General,
    },
    {
      value: 'appearance',
      label: 'Appearance',
      component: Appeareance,
    },
  ];
  let value = $state(settingsPages[0].value);

  let SettingComponent = $derived(
    value
      ? settingsPages.find((p) => p.value === value)?.component
      : settingsPages[0]?.component,
  );
</script>

<div class="px-3">
  <div class="my-2 flex h-8 items-center justify-start gap-2">
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

  <!-- <Appeareance /> -->
  <div class="flex justify-between py-2"></div>
  <SettingComponent></SettingComponent>
</div>
