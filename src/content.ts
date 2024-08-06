import browser from "webextension-polyfill";

declare global {
  interface Window {
    clickListenerAdded?: boolean;
    inputListenerAdded?: boolean;
  }
}
if (!window.clickListenerAdded) {
  console.log("Adding click listener");
  window.clickListenerAdded = true;

  const track = async (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    const elementInfo = {
      tag: clickedElement.tagName,
      clientX: event.clientX,
      clientY: event.clientY,
    };

    try {
      await browser.runtime.sendMessage({
        type: "SEND_MESSAGE",
        from: "BROWSER_TAB",
        message: `user clicks on ${elementInfo.tag}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  document.addEventListener("click", track);
} else {
  console.log("Click listener already added");
}
