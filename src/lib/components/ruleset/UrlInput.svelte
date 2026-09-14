<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import { UrlMatchPatternSchema } from "$lib/schema";
  import { useDebounce } from "runed";

  let { value, isValid = $bindable() } = $props();

  const debouncedValidate = useDebounce(() => {validate()}, () => 200)

  function validate() {
    const urls = value.split(',');
    const matches: string[] = [];
    const excludeMatches: string[] = [];

    const urlInput = document.getElementById('url-input');
    try {
      urls?.forEach((url: string) => {
        url = url.trimStart();
        if (url === '') return;
        UrlMatchPatternSchema.parse(url);
        url.startsWith('!')
          ? excludeMatches.push(url.substring(1))
          : matches.push(url);

        urlInput!.classList.contains('border-red-600')
          ? urlInput?.classList.remove('border-red-600')
          : null;
      });
    } catch (error) {
      urlInput!.classList.contains('border-red-600')
        ? null
        : urlInput?.classList.add('border-red-600');
    }
  }
</script>

<Input
  type="text"
  placeholder="URL Pattern"
  bind:value={value}
  oninput={debouncedValidate}
  id="url-input"
/>
