<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { Settings, Home } from 'lucide-svelte';

  const items = [
    {
      title: 'Home',
      url: '#',
      icon: Home,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
    },
  ];
</script>

<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Menu>
      {#each items as item (item.title)}
        <Sidebar.MenuItem>
          <Sidebar.MenuButton>
            <a href={item.url} class="flex items-center gap-2">
              <item.icon /><span>{item.title}</span>
            </a>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      {/each}
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>
