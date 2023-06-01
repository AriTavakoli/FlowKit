console.log("content script injected")


chrome.runtime.onMessage.addListener((message, sender) => {
  console.log(message);
    if ( message === "eye_dropper_clicked") {
      console.log('yooooooooooo');

        setTimeout(() => {

            const eyeDropper = new EyeDropper();

            eyeDropper.open().then(result => {
                chrome.storage.local.get("color_hex_code", (resp) => {
                    if (resp.color_hex_code && resp.color_hex_code.length > 0) {
                        chrome.storage.local.set({ "color_hex_code": [...resp.color_hex_code, result.sRGBHex] })
                    }
                    else {
                        console.log("no")
                        chrome.storage.local.set({ "color_hex_code": [result.sRGBHex] })
                    }
                })
            }).catch(e => {
                console.log(e)
            })
        }, 500);
    }
})