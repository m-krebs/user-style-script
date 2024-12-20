<script lang="ts">
  import * as monaco from 'monaco-editor';
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import { initVimMode } from 'monaco-vim';

  type EditorLanguage = 'javascript' | 'typescript' | 'css' | 'scss';

  let {
    placeholder = 'Type JavaScript here',
    language = 'javascript',
    vim = false,
  }: {
    placeholder?: string;
    language?: EditorLanguage;
    vim?: boolean;
  } = $props();

  self.MonacoEnvironment = {
    getWorker: (_moduleId, label) => {
      if (label === 'css' || label === 'scss') {
        return new cssWorker();
      }
      if (label === 'javascript') {
        return new tsWorker();
      }
      return new editorWorker();
    },
  };

  let monacoContainer: HTMLElement;
  let vimStatus: HTMLElement = $state(document.createElement('div'));

  onMount(() => {
    monaco.editor.setTheme('vs-dark');
    const editor = monaco.editor.create(monacoContainer, {
      placeholder: placeholder,
      language: language,
      minimap: { enabled: false },
    });
    if (vim) {
      initVimMode(editor, vimStatus);
    }
  });
</script>

<div
  bind:this={monacoContainer}
  class="relative h-[400px] min-w-[50vw] border-4 border-r-4 border-red-700"
>
  {#if vim}
    <div
      bind:this={vimStatus}
      class="absolute bottom-0 z-20 border-2 border-green-600 bg-black"
    ></div>
  {/if}
</div>
