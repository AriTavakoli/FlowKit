
export default function captureEventTarget() {
  let iframe = document.querySelector('#site-iframe-next')
  if (iframe) {
    iframe.contentWindow.addEventListener('click', (event) => {
      console.log('Element clicked in iframe:', event.target);
      let parsedEvent  = elementToString(event.target);
      return parseHTMLString(parsedEvent.toString());
    });
  }
}


