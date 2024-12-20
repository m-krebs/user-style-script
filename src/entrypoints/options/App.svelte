<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index';
  import * as Sidebar from '$lib/components/ui/sidebar/index';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
  import { Button } from '$lib/components/ui/button';
  import Editor from '$lib/components/editor.svelte';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { ModeWatcher } from 'mode-watcher';
  import OptionsSidebar from '$lib/components/options-sidebar.svelte';
  import { Toaster } from '$lib/components/ui/sonner/index';
  import { createUserScript } from '$lib/utils';
  import { onMount } from 'svelte';
  import Router, { link } from 'svelte-spa-router';

  const routes = {
    '/editor': Editor,
  };

  onMount(() => {
    browser.userScripts.configureWorld({
      csp: "script-src 'self'",
    });

    createUserScript({
      id: 'test',
      matches: ['https://*.google.com/*'],
      js: 'alert("Ding dong")',
    });
  });
</script>

<Router {routes} />
<ModeWatcher />
<Toaster richColors position="bottom-center" />
<Sidebar.Provider>
  <OptionsSidebar />
  <main>
    <Sidebar.Trigger />
    <h1>Options</h1>

    <a href="/editor" use:link>Editor</a>

    <Dialog.Root>
      <Dialog.Trigger>Add</Dialog.Trigger>
      <Dialog.Content class="min-w-[80vw]">
        <Dialog.Header>
          <Dialog.Title>Create a new Ruleset</Dialog.Title>
        </Dialog.Header>
        <!-- Content -->

        <div class="flex w-full max-w-sm flex-col gap-1.5">
          <Input
            type="ruleName"
            id="ruleName"
            placeholder="Name of the ruleset"
          />
        </div>
        <Label for="ruleName">Actions</Label>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <!-- <Button type="button">Add</Button> -->
            Add
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.GroupHeading>
                Add new content
              </DropdownMenu.GroupHeading>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>JavaScript</DropdownMenu.Item>
              <DropdownMenu.Item>CSS</DropdownMenu.Item>
              <DropdownMenu.Item>External</DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <!-- <Editor /> -->
      </Dialog.Content>
    </Dialog.Root>
  </main>
</Sidebar.Provider>
