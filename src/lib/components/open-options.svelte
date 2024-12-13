<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Tooltip from '$lib/components/ui/tooltip';
  import { Settings } from 'lucide-svelte';

  const openOrFocusOptions = () => {
    const optionsUrl = browser.runtime.getURL('/options.html');

    browser.tabs.query({}, (tabs) => {
      const existingTab = tabs.find((tab) => tab.url === optionsUrl);

      if (existingTab) {
        browser.tabs.update(existingTab.id as number, { active: true });
      } else {
        browser.tabs.create({ url: optionsUrl });
      }
      window.close();
    });
  };
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button onclick={openOrFocusOptions} variant="outline" size="icon">
        <Settings />
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>Open Options</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
