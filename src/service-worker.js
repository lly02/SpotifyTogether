import Client from "./scripts/client.js";
import * as chromeAPI from "./scripts/api/chromeAPI.js"

const CLIENT = Client.getInstance();

chrome.runtime.onMessage.addListener(({ target, message }, sender, sendResponse) => {
    if (target != "service_worker") return;

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
            await CLIENT.host();
            return await CLIENT.retrieveSession();

        case "retrieve session":
            return await CLIENT.retrieveSession();

        case "disconnect":
            return await CLIENT.disconnect(); 
    };
}