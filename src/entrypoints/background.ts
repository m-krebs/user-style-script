export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
});

browser.runtime.onInstalled.addListener(({ reason }) => {
  console.log("reason: ", reason)
})

