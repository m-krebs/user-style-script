import { mount } from 'svelte';
import App from './App.svelte';
import '$assets/general.css';
// import './app.css';

const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;
