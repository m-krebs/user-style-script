<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { SidebarTrigger } from '$lib/components/ui/sidebar/index';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import { RulesetStorage } from '$lib/storage';

  let { params } = $props();

  const ruleset = RulesetStorage.get(params.wild);
</script>

<div class="px-3">
  <div class="my-2 flex items-center justify-start gap-2">
    <SidebarTrigger class="p-4" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <!-- <span class="text-sm"> -->
    <!--   Edit Ruleset: {#await ruleset then data}{data!.name}{/await} -->
    <!-- </span> -->

    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Ruleset Detail</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </div>
  <Separator />

  {#await ruleset then r}
    {JSON.stringify(r)}
  {/await}
</div>
