<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
  import { SidebarTrigger } from '$lib/components/ui/sidebar/index';

  import Separator from '$lib/components/ui/separator/separator.svelte';
  import Ruleset from '../ruleset.svelte';
</script>

<div class="flex h-screen flex-col px-3">
  <div class="flex items-center justify-start gap-2 py-2">
    <SidebarTrigger class="p-4" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Create new ruleset</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </div>
  <Separator />

  <Ruleset />
</div>
