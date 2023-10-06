import client from "./scripts/client.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "host") {
    //   const CLIENT = client.getInstance();
    //   CLIENT.host();
        sendResponse("hi");
    };
});