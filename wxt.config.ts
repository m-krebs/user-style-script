import { defineConfig } from 'wxt';
import path from 'path'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'


// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ['storage', 'tabs', 'userScripts']
  },
  manifestVersion: 3,
  srcDir: 'src',
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-svelte'],
  alias: {
    $lib: path.resolve("./src/lib/"),
    $assets: path.resolve("./src/assets/")
  },
  vite: (env) => ({
    plugins: [monacoEditorPlugin({ languageWorkers: ['editorWorkerService', 'typescript', 'css'] })]
  }),
});
