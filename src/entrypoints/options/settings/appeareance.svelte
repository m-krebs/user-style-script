<script lang="ts">
  import * as RadioGroup from '$lib/components/ui/radio-group';
  import { toggleMode, mode } from 'mode-watcher';
  import { Label } from '$lib/components/ui/label/index';
</script>

<RadioGroup.Root
  class="grid max-w-md grid-cols-2 gap-8 pt-2"
  orientation="horizontal"
  value={$mode}
  onValueChange={() => {
    toggleMode();
  }}
>
  <Label class="[&:has([data-state=checked])>div]:border-primary">
    <RadioGroup.Item value="light" class="sr-only" />
    <div
      class="items-center rounded-md border-2 border-muted p-1 hover:border-accent"
    >
      <div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
        <div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
          <div class="h-2 w-[80px] rounded-lg bg-[#ecedef]"></div>
          <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
        </div>
        <div
          class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"
        >
          <div class="h-4 w-4 rounded-full bg-[#ecedef]"></div>
          <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
        </div>
        <div
          class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"
        >
          <div class="h-4 w-4 rounded-full bg-[#ecedef]"></div>
          <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
        </div>
      </div>
    </div>
    <span class="block w-full p-2 text-center font-normal"> Light </span>
  </Label>
  <Label class="[&:has([data-state=checked])>div]:border-primary">
    <RadioGroup.Item value="dark" class="sr-only" />
    <div
      class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
    >
      <div class="space-y-2 rounded-sm bg-zinc-950 p-2">
        <div class="space-y-2 rounded-md bg-zinc-800 p-2 shadow-sm">
          <div class="h-2 w-[80px] rounded-lg bg-zinc-400"></div>
          <div class="h-2 w-[100px] rounded-lg bg-zinc-400"></div>
        </div>
        <div
          class="flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm"
        >
          <div class="h-4 w-4 rounded-full bg-zinc-400"></div>
          <div class="h-2 w-[100px] rounded-lg bg-zinc-400"></div>
        </div>
        <div
          class="flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm"
        >
          <div class="h-4 w-4 rounded-full bg-zinc-400"></div>
          <div class="h-2 w-[100px] rounded-lg bg-zinc-400"></div>
        </div>
      </div>
    </div>
    <span class="block w-full p-2 text-center font-normal"> Dark </span>
  </Label>
  <!-- <RadioGroup.Input name="theme" /> -->
</RadioGroup.Root>
