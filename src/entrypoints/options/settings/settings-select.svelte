<script lang="ts">
  import { Select } from 'bits-ui';
  import { ChevronDown } from 'lucide-svelte';

  let { items, selected = $bindable() }: { items: any; selected: any } =
    $props();

  const selectedLabel = $derived(
    selected
      ? items.find((item) => item.value === selected)?.label
      : 'Select a theme',
  );
</script>

<Select.Root
  type="single"
  onValueChange={(v) => (v ? (selected = v) : selected)}
>
  <Select.Trigger
    class="
    flex
    h-10
    w-full
    items-center
    justify-between
    gap-3
    rounded-md
    bg-background
    px-3
    py-1
    text-sm
    ring-offset-background
    focus:outline-none
    [&>span]:line-clamp-1"
    aria-label="Select a theme"
  >
    {selectedLabel}
    <ChevronDown class="h-4 w-4 opacity-50" />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content
      class="focus-override
      z-50
      max-h-96
      w-[var(--bits-select-anchor-width)]
      min-w-[var(--bits-select-anchor-width)]
      select-none
      rounded-md
      border
      border-muted
      bg-background
      px-0 shadow-popover
      outline-none data-[side=bottom]:-translate-y-1
      data-[side=left]:-translate-x-1
      data-[side=right]:translate-x-1
      data-[side=top]:-translate-y-1
      data-[state=open]:animate-in
      data-[state=closed]:animate-out
      data-[state=closed]:fade-out-0
      data-[state=open]:fade-in-0
      data-[state=closed]:zoom-out-95
      data-[state=open]:zoom-in-95
      data-[side=bottom]:slide-in-from-top-2
      data-[side=left]:slide-in-from-right-2
      data-[side=right]:slide-in-from-left-2
      data-[side=top]:slide-in-from-bottom-2"
      sideOffset={10}
    >
      <Select.Viewport class="p-1">
        {#each items as item, i (i + item.value)}
          <Select.Item
            class="rounded-button flex w-full select-none items-center rounded-sm py-2 pl-3 pr-1.5 text-sm capitalize outline-none duration-75 data-[highlighted]:bg-muted data-[disabled]:opacity-50"
            value={item.value}
            label={item.label}
            disabled={item.disabled}
          >
            {#snippet children({ selected })}
              {item.label}
            {/snippet}
          </Select.Item>
        {/each}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>
