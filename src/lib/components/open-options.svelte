<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Tooltip from '$lib/components/ui/tooltip';
  import { Settings } from 'lucide-svelte';

  function openOptions() {
    browser.runtime.openOptionsPage();
  }
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button onclick={openOptions} variant="outline" size="icon">
        <Settings />
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>Open Options</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
