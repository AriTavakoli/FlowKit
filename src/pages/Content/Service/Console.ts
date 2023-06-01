class Console {
  static printStorageKeys() {
    chrome.storage.local.get(null, function(data) {
      const keys = Object.keys(data);
      const table = [['Key', 'Value']];
      keys.forEach(function(key) {
        const value = data[key];
        const row = [key, JSON.stringify(value)];
        table.push(row);
      });
      console.table(table);
    });
  }

  static color(message, color) {
    console.log('%c' + message, 'color: ' + color);
  }

  static logYellowKeys(obj, collapsible = false) {
    const logFn = collapsible ? console.groupCollapsed : console.log;

    Object.keys(obj).forEach(function(key) {
      logFn('%c' + key + ':', 'color: yellow', obj[key]);
    });
  }

  static printError(error) {
    console.error('%c' + error.name + ':', 'color: red', error.message);
    console.error(error.stack);
  }

  static printSuccess(message) {
    console.log('%c' + message, 'color: green');
  }

  static printWarning(message) {
    console.warn('%c' + message, 'color: yellow');
  }

  static printObject(obj, label) {
    if (label) {
      console.log('%c' + label + ':', 'font-weight: bold');
    }
    console.dir(obj);
  }
}
