<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index';
  import { Bug, Home, Puzzle, Settings } from 'lucide-svelte';
  import Separator from '$lib/components/ui/separator/separator.svelte';

  let debug = $state(false);
  browser.management.getSelf((info) => {
    if (info.installType === 'development') {
      debug = true;
    }
  });

  const close = () => {
    // TODO: close sidebar on small screens
  };
</script>

<Sidebar.Root collapsible="icon">
  <Sidebar.Content class="m-2">
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href="#/" {...props} onclick={close}><Home /><span>Home</span></a
            >
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href="#/modules" {...props}><Puzzle />External Modules</a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href="#/settings" {...props}><Settings />Settings</a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      {#if debug}
        <Separator />
        <Sidebar.MenuItem>
          <Sidebar.MenuButton>
            {#snippet child({ props })}
              <a href="#/debug" {...props}><Bug />Debug</a>
            {/snippet}
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      {/if}
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>
