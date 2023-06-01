

export default class CustomMutation {
  static observeDomForSidebar(callback) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const targetNode = mutation.target;
          const newElement = Array.from(targetNode.children).find(
            (child) => child.id === 'right-sidebar'
          );
          if (newElement) {
            // the element with the id "right-sidebar" is available, do something here
            callback();
            // stop observing once the element is available
            observer.disconnect();
          }
        }
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    return observer;
  }

  static observeDomForIframe(callback) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const targetNode = mutation.target;
          const newElement = targetNode.querySelector('#site-iframe-next');
          if (newElement) {
            console.log('newElement', newElement);
            // the iframe element with the id "site-iframe-next" is available, do something here
            callback(newElement);
            // stop observing once the element is available
            observer.disconnect();
          }
        }
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    return observer;
  }
}
