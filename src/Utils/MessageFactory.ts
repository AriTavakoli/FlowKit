

class MessageFactory {

  public static async CreateMessage(messageType: string, message: string): Promise<any> {

    let response;
    switch (messageType) {
      case 'message':
        response = await chrome.runtime.sendMessage({ message: message });
        return response;
      case 'updatePopup':
        response = await chrome.runtime.sendMessage({ updatePopup: message });
        return response;
      case 'css':
        response = await chrome.runtime.sendMessage({ css: message });
        return response;
      default:
        break;
    }
  }

}


export default MessageFactory