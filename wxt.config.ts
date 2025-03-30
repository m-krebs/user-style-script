import { defineConfig } from 'wxt';
import path from 'path'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ['storage', 'tabs', 'userScripts', 'scripting'],
    host_permissions: ['<all_urls>']
  },
  manifestVersion: 3,
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  alias: {
    $lib: path.resolve("./src/lib/"),
    $assets: path.resolve("./src/assets/")
  },
  vite: () => ({
    resolve: { conditions: ["browser"] }
  }),
});
