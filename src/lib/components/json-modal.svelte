<script lang="ts">
  import {prettyPrintJson} from 'pretty-print-json';

  let { json = $bindable() } = $props();

  let html = prettyPrintJson.toHtml(json)

  $effect(()=>{
    console.log(json)
    html = prettyPrintJson.toHtml(json)
    document.getElementById('debug-json')!.innerHTML = html;
  })
</script>

<pre id="debug-json" class="bg-gray-200 z-10 absolute bottom-4 left-4 rounded-xl p-4 text-lg"></pre>
