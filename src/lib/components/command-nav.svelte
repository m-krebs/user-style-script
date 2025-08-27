<script lang="ts">
  import * as Command from '$lib/components/ui/command/index.js';
  import { Puzzle, ScrollText, SettingsIcon } from 'lucide-svelte';

  let open = $state(false);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open = !open;
    }
  }
</script>

<svelte:document onkeydown={handleKeydown} />

<Command.Dialog bind:open>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Links">
      <Command.Item
        onSelect={() => {
          window.location.href = '#/modules';
        }}
      >
        <Puzzle class="mr-2 size-4" />
        <span>External Modules</span>
      </Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Settings">
      <Command.Item>
        <SettingsIcon class="mr-2 size-4" />
        <span>Settings</span>
        <Command.Shortcut>⌘S</Command.Shortcut>
      </Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Rulesets">
      <Command.Item
        onSelect={() => {
          window.location.href = '#';
        }}
      >
        <ScrollText class="mr-2 size-4" />
        <span>Rulesets > Overview</span>
      </Command.Item>
      <Command.Item
        onSelect={() => {
          window.location.href = '#/ruleset/add';
        }}
      >
        <ScrollText class="mr-2 size-4" />
        <span>Rulesets > Create new</span>
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>
