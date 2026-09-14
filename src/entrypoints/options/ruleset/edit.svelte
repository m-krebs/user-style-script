<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { SidebarTrigger } from '$lib/components/ui/sidebar/index';
  import Separator from '$lib/components/ui/separator/separator.svelte';
  import { RulesetStorage } from '$lib/storage';
  import NotFound from '../404.svelte';
  import Ruleset from '$lib/components/ruleset/ruleset.svelte';
  import type { Ruleset as RulesetType } from '$lib/schema';

  let { params } = $props();

  const ruleset = RulesetStorage.get(params.wild);

  const submitFunction = (ruleset: RulesetType) => {
    alert(ruleset.active)
  }
</script>

<div class="flex h-screen flex-col px-3">
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
          <Breadcrumb.Page>Ruleset Detail</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </div>
  <Separator />

  {#await ruleset then ruleset}
    {#if !ruleset}
      <NotFound />
    {:else}
      <Ruleset {ruleset} {submitFunction} />
    {/if}
  {/await}
</div>
