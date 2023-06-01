// This code listen for all DOM events and print to console.
// The method used is to iterate over the window object and check if the key start with "on".
// If the key start with "on", it means that it is an event, so it is added to the window object.
// The event is then listen to and when triggered, it is printed to the console.



class Dom {

  static getAllEvents() {
    Object.keys(window).forEach(key => {
      if (/^on/.test(key)) {
        window.addEventListener(key.slice(2), event => {
          console.log(event);
        });
      }
    });

  }


}

export default Dom;