<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index';
  import * as Collapsible from '$lib/components/ui/collapsible/index';
  import { ChevronRight, Home, Settings } from 'lucide-svelte';

  const data = {
    settings: [
      {
        title: 'Settings',
        icon: Settings,
        items: [
          {
            title: 'General',
            url: '#',
          },
          {
            title: 'Appeareance',
            url: '#',
          },
        ],
      },
    ],
  };
</script>

<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href="#/" {...props}><Home />Home</a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Collapsible.Root open class="group/collapsible">
        <Sidebar.MenuItem>
          {#each data.settings as setting}
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Sidebar.MenuButton {...props}>
                  <setting.icon />
                  {setting.title}
                  <ChevronRight
                    class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </Sidebar.MenuButton>
              {/snippet}
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Sidebar.MenuSub>
                {#each setting.items as subItem}
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton>
                      <a href={subItem.url}>
                        {subItem.title}
                      </a>
                    </Sidebar.MenuSubButton>
                  </Sidebar.MenuSubItem>
                {/each}
              </Sidebar.MenuSub>
            </Collapsible.Content>
          {/each}
        </Sidebar.MenuItem>
      </Collapsible.Root>
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>
