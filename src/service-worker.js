import Client from "./scripts/client.js";

const CLIENT = Client.getInstance();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
        messageHandler(message, sender, sendResponse)
            .then(sendResponse);
        return true;
    } catch (e) {
        console.log(e);
    }
});

async function messageHandler(message, sender, sendResponse) {
    switch (message) {
        case "host":
            return await CLIENT.host();
    };
}