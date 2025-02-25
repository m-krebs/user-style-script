<script lang="ts">
  import * as monaco from 'monaco-editor';
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  // @ts-ignore
  import { initVimMode } from 'monaco-vim';
  import { cn } from '$lib/utils';
  import { useDebounce } from 'runed';

  let vimMode = $state(false);

  type EditorLanguage = 'javascript' | 'typescript' | 'css' | 'scss';

  let {
    class: className,
    placeholder = 'Type JavaScript here',
    language = 'javascript',
    vim = undefined,
    value = $bindable(undefined),
    valueUpdated,
  }: {
    class?: string;
    placeholder?: string;
    language?: EditorLanguage;
    vim?: boolean;
    value?: string;
    valueUpdated: any;
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

  const debouncedValueUpdate = useDebounce((value: string) => {
    valueUpdated(value);
  }, 400);

  onMount(() => {
    if (vim === undefined) {
      browser.storage.local.get(['settings']).then((settings) => {
        vimMode = settings.edtior?.vimMode;
      });
    }

    monaco.editor.setTheme('vs-dark');
    const editor = monaco.editor.create(monacoContainer, {
      placeholder: placeholder,
      language: language,
      minimap: { enabled: false },
      value: value,
      automaticLayout: true,
    });
    if (vimMode) {
      initVimMode(editor, vimStatus);
    }

    editor.onEndUpdate(() => {
      debouncedValueUpdate(editor.getValue());
    });
  });
</script>

<div
  bind:this={monacoContainer}
  class={cn('belative rounded-md border-2', className)}
>
  {#if vim}
    <div
      bind:this={vimStatus}
      class="absolute bottom-0 z-20 border-2 border-green-600 bg-black"
    ></div>
  {/if}
</div>
