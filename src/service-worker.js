import Client from "./scripts/client.js";

const CLIENT = Client.getInstance();

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message === "host") {
        CLIENT.host();
    };
});