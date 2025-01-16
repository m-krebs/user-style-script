<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Tooltip from '$lib/components/ui/tooltip';
  import { Settings } from 'lucide-svelte';

  const onclick = () => browser.runtime.openOptionsPage();
</script>

<Tooltip.Provider>
  <Tooltip.Root delayDuration={300}>
    <Tooltip.Trigger>
      <Button {onclick} variant="outline" size="icon">
        <Settings />
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content side={'left'}>
      <p>Open Options</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
